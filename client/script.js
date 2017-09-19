
var app = new Vue({
  el: '#app',
  data: {
    formHide: false,
    message: 'Hello Vue!',
    click: false,
    results:'',
    height:'',
    data: {
      'weight':{'value':'','unit':'lb'},
      'height':{'value':null,'unit':'ft-in'},
      'sex':'',
      'age':''
    }
  },
  methods: {
    kgtolb: function(str){
      var temp = str.split(' ')
      temp[0] = this.convert(temp[0])
      temp[2] = this.convert(temp[2])
      return temp.join(' ')
    },
    convert: function(s){
      s = s.split('kg')[0]*=2.204
      return s.toFixed(2) + ' lbs'
    },
    clicked: function(){
      this.click = !this.click
    },
    submit:function(){
      var temp = this.height.split("'")
      this.data.height.value = `${temp[0]}-${temp[1]}`
      axios({
          method: 'POST',
          url: 'https://bmi-vuejs.herokuapp.com/sendbmi',
          params: this.data
        })
        .then(response => {
          this.results = response.data
          console.log(response.data)
          this.formHide = true;
        })
      },
  }
})
