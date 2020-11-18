var webstore = new Vue({
    el: '#app',
    data: {
        showClasses: true,
        sitename: 'After School Classes',
        cart: [], //Array to store items in shopping cart
        navButtonName: "Cart and Checkout", //Variable to change button name on page navigation
        sortType:'', //Variable for the sorting type
        //Order details object
        order: {
            firstName: "",
            lastName: "",
            address: "",
            city:"",
            phone:"",
            method:'Home',
            gift: false,
            sendGift: 'Send as a gift',
            dontSendGift: 'Do not send as a gift'
        },
        classes: classes,
    },
    methods:{
        addToCart: function (afterSchoolClass) {     
            this.cart.push({
                id: afterSchoolClass.id, 
                subject: afterSchoolClass.subject, 
                image: afterSchoolClass.image,
                price: afterSchoolClass.price,
                location: afterSchoolClass.location,
                availableSpaces: afterSchoolClass.availableSpaces,
                description: afterSchoolClass.description
            });
            afterSchoolClass.availableSpaces = afterSchoolClass.availableSpaces - 1;
        },
        addToCheckOutCart(afterSchoolClass){
            this.addToCheckOutCart.push(afterSchoolClass);
        },
        showCheckout: function(){
            this.showClasses = this.showClasses ? false : true;
            this.showCart();
            //Changing button name for navigation between classes and cart/checkout
            if (this.showClasses == false){
                this.navButtonName = "Classes";
            }else{
                this.navButtonName = "Cart and Checkout";
            }
        },
        showCart: function(){
            let cartHTML = "";
            let cartItemsDiv = document.getElementById('cartItemsDiv');
            cartHTML += '<h2>Cart</h2>';
                for(let i=0; i < this.cart.length; i++){
                    //Displaying all classes in cart
                    cartHTML +=
                    "<div class='cart-product'>"+
                            "<div class='card horizontal'>" +
                                "<div class='card-image'>" +
                                    "<img src ='" + this.cart[i].image + "'>"+
                                "</div>" +
                                "<div class='card-stacked'>" +
                                    "<div class='card-content'>" +
                                    "<span class='subject'>Subject: </span>" +
                                    "<p class='subjectp'>" + this.cart[i].subject + "</p>" +
                                    "<span class='location'>Location: </span>" +
                                    "<p class='locationp'>" + this.cart[i].location + "</p>" +
                                    "<span class='price'> Price: </span>" +
                                    "<p class='pricep'>£" + this.cart[i].price + "</p>" + 
                                    "<span class='description'>Description: </span>" +
                                    "<p class='descriptionp'>" + this.cart[i].description + "</p>" +  
                                    "<button class='removeItemBtn' ref='removeItemBtn' onclick='removeItem(this.afterSchoolClass, this.cart)'> Remove </button>" +          
                                    "</div>" + 
                                "</div>" + 
                            "</div>" + 
                    "</div>";
                }
            cartItemsDiv.innerHTML = cartHTML;
        }, 
        //Showing checkout button if an item is added to the cart
        showCheckoutButton: function(){
            return 0 < this.cart.length;
        },
        submitForm(){
            alert('Order Has Been Placed, Thanks for your order!')
        },
        sort(type) {
            this.sortType = type;
        },
        //Checking if there is enough stock to add to cart
        canAddToCart: function(afterSchoolClass){
            return afterSchoolClass.availableSpaces > this.cartCount(afterSchoolClass.id);
        },
        validateCheckoutInputs: function() {
            if (this.order.firstName.value == "") {
                var x = document.forms["myForm"]["firstName"].value;
            if (x == "") {
                alert("Name must be filled");
                return false;
            }
            }else{
                this.submitForm();
            }

        },
        //Checking that checkout form has required fields filled in
        checkForm: function () {
            return (this.order.firstName.length > 0 && this.order.lastName.length > 0 && this.order.phone.length > 0);
        },     
        cartCount(id){
            let count = 0;
            for (let i = 0; i < this.cart.length; i++){
                if(this.cart[i] === id){
                    count++
                }
            }
            return count;
        }
    },
    computed: {
        cartItemCount: function(){
            return this.cart.length;
        },
        //Sorting Classes
        items() {
            if(this.sortType === '') return this.classes;
            if(this.sortType === 'subjectAscending') {
              return this.classes.sort((a,b) => {
                if(a.subject > b.subject) return -1;
                if(a.subject < b.subject) return 1;
                return 0;
              });
            }
            if(this.sortType === 'subjectDescending') {
                return this.classes.sort((a,b) => {
                  if(a.subject < b.subject) return -1;
                  if(a.subject > b.subject) return 1;
                  return 0;
                });
              }
            if(this.sortType === 'priceAscending') {
              return this.classes.sort((a,b) => {
                if(a.price < b.price) return -1;
                if(a.price > b.price) return 1;
                return 0;
              });
            }
            if(this.sortType === 'priceDescending') {
                return this.classes.sort((a,b) => {
                  if(a.price > b.price) return -1;
                  if(a.price < b.price) return 1;
                  return 0;
                });
            }
            if(this.sortType === 'locationAscending') {
                return this.classes.sort((a,b) => {
                  if(a.location > b.location) return -1;
                  if(a.location < b.location) return 1;
                  return 0;
                });
            }
            if(this.sortType === 'locationDescending') {
                return this.classes.sort((a,b) => {
                  if(a.location < b.location) return -1;
                  if(a.location > b.location) return 1;
                  return 0;
                });
            }
            if(this.sortType === 'availabilityAscending') {
                return this.classes.sort((a,b) => {
                  if(a.availableSpaces < b.availableSpaces) return -1;
                  if(a.availableSpaces > b.availableSpaces) return 1;
                  return 0;
                });
            }
            if(this.sortType === 'availabilityDescending') {
                return this.classes.sort((a,b) => {
                  if(a.availableSpaces > b.availableSpaces) return -1;
                  if(a.availableSpaces < b.availableSpaces) return 1;
                  return 0;
                });
            }
        },
    },
});
