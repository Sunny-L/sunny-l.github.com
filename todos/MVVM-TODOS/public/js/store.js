(function(exports) {
    'usr strict'

    const STORE_EKEY = 'goodsList';

    exports.storeService = {
        fetch: function() {
            var localGoods = localStorage.getItem(STORE_EKEY);
            localGoods = JSON.parse(localGoods || '[]');
            var dataList = [];
            if (localGoods.length > 0) {
                for (var tmp in localGoods) {
                    localGoods[tmp].isEdit = false;
                }
                dataList = localGoods;
            } else {
                $.ajax({
                    url: '../data/data.json',
                    dataType: 'json',
                    async: false,
                    success: function(data) {
                        for (var key in data) {
                            data[key].isEdit = false;
                        }
                        dataList = data;
                    }
                })
            }
            return dataList;
        },
        save: function(goodsList) {
            localStorage.setItem(STORE_EKEY, JSON.stringify(goodsList));
        }
    }
})(window)