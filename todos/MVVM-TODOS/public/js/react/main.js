'use strict'
const React = require('react');
const ReactDom = require('react-dom');
import { Modal, Button} from 'antd';

const SearchBar = React.createClass({
    render:function(){
        return(
            <div className="form-group search-wrap">
                <label className="col-md-1 control-label">搜索</label>
                <div className="col-md-4">
                    <input type="text" className="form-control" ref="query" onChange={this.props.handleSearch}/>
                </div>
            </div>
        )
    }
})
const ListTable = React.createClass({
    render:function(){
        let listNodes = [];
        this.props.list.forEach(function(item){
            if(this.props.query && item.title.indexOf(this.props.query) ==-1){
                return;
            }
            listNodes.push(item)
        }.bind(this))
        let self = this;
        return(
            <table className="table data-list table-hover">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th><a href="javascript:void(0);" onClick={this.props.sort.bind(this,'price')} >价格<span className={this.props.sortKeys.price?'arrow asc':'arrow dsc'} ></span></a></th>
                        <th><a href="javascript:void(0);" onClick={this.props.sort.bind(this,'volume')} >销量<span className={this.props.sortKeys.volume?'arrow asc':'arrow dsc'} ></span></a></th>
                        <th style={{width:'270px'}}>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listNodes.map(function(item,index){
                            return (
                                <tr key={index}>
                                    <td>
                                        <input type="text" value={item.title} className={item.isEdit?'title':'hide'} onChange={this.props.handleSave.bind(this,index,'title')} onBlur={this.props.autoSave.bind(this,index)} />
                                        <span className={item.isEdit?'hide':''} onDoubleClick={this.props.handleUpdate.bind(this,index)} >{item.title}</span>
                                    </td>
                                    <td>
                                        <input type="text" value={item.price} className={item.isEdit?'':'hide'} onChange={this.props.handleSave.bind(this,index,'price')} onBlur={this.props.autoSave.bind(this,index)} />
                                        <span className={item.isEdit?'hide':''}  onDoubleClick={this.props.handleUpdate.bind(this,index)} >&yen;{item.price}</span>
                                    </td>
                                    <td>{item.volume}件</td>
                                    <td>
                                        <button type="button" className="btn btn-danger" onClick={this.props.handleDelete.bind(this,index)} >删除</button>
                                    </td>
                                </tr>
                                )
                        }.bind(this))
                    }
                </tbody>
            </table>
        )
    }
})

const GoodsForm = React.createClass({
    getInitialState() {
    return {
        visible: false,
        newGoods:{
            title:'',
            price:0,
            volume:0
        }
    };
  },
  showModal() {
    this.setState({
      visible: true
    });
  },
  handleOk() {
    let title = this.refs.title.value;
    let price = this.refs.price.value;
    this.props.handleAdd({title:title,price:price,volume:0})
    this.setState({
        visible: false,
        newGoods:{
            title:'',
            price:0,
            volume:0
        }
    });
  },
  handleChange:function(event){
      console.log(event.target.attributes['name'].value)
      let key = event.target.attributes['name'].value
      this.state.newGoods[key] = event.target.value;
      this.setState({
          newGoods:this.state.newGoods
      })
  },
  handleCancel() {
    this.setState({
      visible: false
    });
  },
  render() {
    return <div>
      <Button onClick={this.showModal}>新增</Button>
      <Modal title="新增商品" visible={this.state.visible}
        onOk={this.handleOk} onCancel={this.handleCancel}>
        <form className="form-horizontal">
            <div className="form-group">
              <label htmlFor="" className="col-sm-2 control-label">名称</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" ref="title" name="title" value={this.state.newGoods.title} onChange={this.handleChange}/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword3" className="col-sm-2 control-label">价格</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" ref="price" name="price" value={this.state.newGoods.price} onChange={this.handleChange}/>
              </div>
            </div>
          </form>
      </Modal>
    </div>;
  }
})

const GoodsBox = React.createClass({
    getInitialState:function(){
        return{
            list:[],
            query:'',
            sortKeys:{'price':false,'volume':false}
        }
    },
    componentDidMount:function(){
        this.setState({
            list:storeService.fetch()
        })
    },
    handleSave:function(...args){
        this.state.list[args[0]][args[1]] = args[2].target.value;
        this.setState({
            list:this.state.list
        })
    },
    autoSave:function(...args){
        this.state.list[args[0]].isEdit = false;
        this.setState({
            list:this.state.list
        })
    },
    handleDelete:function(index){
        this.state.list.splice(index,1)
        this.setState({
            list:this.state.list
        })
    },
    handleAdd:function(newGoods){
        this.state.list.push(newGoods)
        this.setState({
            list:this.state.list
        })
    },
    handleUpdate:function(index){
        this.state.list[index].isEdit = true;
        this.setState({
            list:this.state.list
        })
    },
    handleSearch:function(event){
        this.setState({
            query:event.target.value
        })
    },
    sort:function(key){
        let list = this.state.list.sort(function(a,b){
            return a[key]-b[key];
        })
        if(this.state.sortKeys[key]){
            list.reverse();
        }
        this.state.sortKeys[key] = !this.state.sortKeys[key];
        this.setState({
            list:list,
            sortKeys:this.state.sortKeys
        })
    },
    render:function(){
        let self = this;
        return (
            <div>
                <form action="index.html" method="post" className="form-horizontal">
                    <SearchBar handleSearch={this.handleSearch}/>
                </form>
                <ListTable query={this.state.query} list={this.state.list} handleSave={this.handleSave} handleUpdate={this.handleUpdate} handleDelete={this.handleDelete} sort={this.sort} sortKeys={this.state.sortKeys} autoSave={this.autoSave}/>
                <GoodsForm handleAdd={this.handleAdd}/>
            </div>
        )
    }
})

ReactDom.render(<GoodsBox />,document.getElementsByClassName('wrap')[0])
