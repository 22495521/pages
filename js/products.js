const app = Vue.createApp({
    data(){
        return{
            products:{},
            url:'https://vue3-course-api.hexschool.io/v2',
            path :'biggo',
            productsContent:{},
        }
    },

    methods:{


        //取得產品列表
        getProducts(){
            axios.get(`${this.url}/api/${this.path}/admin/products/all`)
            .then((res)=>{
                this.products = res.data.products;
                //物件長度
                //console.log(Object.keys(this.products).length);
            })
            .catch((error)=>{
                //失敗傳送回login
                console.log(error);
            })
        },

        //查看產品內容

        seeContent(item){
            this.productsContent= item;
        }



    },
    
    mounted(){


        //從cookie取得token
        var token = document.cookie.replace(/(?:(?:^|.*;\s*)bigtoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        
        //把cookie放進header
        axios.defaults.headers.common['Authorization'] = token;
        

        //登入驗證
        axios.post(`${this.url}/api/user/check`)
            .then((res)=>{
                this.getProducts();
            })
            .catch((error)=>{
                //失敗傳送回login
                document.location.href="login.html";
            })
        



    },  

})


app.mount('#app');