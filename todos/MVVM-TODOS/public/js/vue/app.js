Vue.component('grid',{
    template:'#grid-template',
    replace:true,
    props:{
        data:Array,
        query:String
    },
    data:function(){
        return {
            sortKey:'',
            sortOrders:{
                price:-1,
                volume:-1
            },
            newGoods:{
                title:'',
                price:0,
                volume:0
            }
        }
    },
    methods:{
        sort:function(key){
            this.sortKey = key;
            this.sortOrders[key] = -this.sortOrders[key]
        },
        handleDelete:function(goods){
            this.data.$remove(goods);
        },
        handleUpdate:function(index){
            this.data[index].isEdit = true;
        },
        handleSave:function(index){
            this.data[index].isEdit = false;
        },
        handleAdd:function(){
            if(this.newGoods){
                this.data.push(this.newGoods);
                $('#myModal').modal('hide')
            }
        }
    },
    watch:{
        data:{
            handler:function(data){
                storeService.save(data);
            },
            deep:true
        }
    }
})

var demo = new Vue({
    el:'#demo',
    data:{
        query:'',
        girdData:storeService.fetch()
    },
    methods:{
    }

})
