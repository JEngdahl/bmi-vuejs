
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
          url: 'https://bmi-vuejs.herokuapp.com/',
          params: this.data
        })
        .then(response => {
          this.results = response.data
          console.log(response.data)
          this.formHide = true;
          // this.weightChart(response.data)
        })
      },
  //   weightChart: function(data){
  //     var chart = document.getElementById("myChart").getContext('2d');
  //     console.log(chart)
  //     var myChart = new Chart(chart).Doughnut([
	// 	{
	// 		value: data.weight.lb 2.204,
	// 		color:"#42f47d",
	// 		highlight: "#FF5A5E",
	// 		label: "Green"
	// 	},
	// 	{
	// 		value: 50,
	// 		color: "#ef5734",
	// 		highlight: "#5AD3D1",
	// 		label: "Red"
	// 	}
	// ],
	// // Options
	// {
	// 	segmentShowStroke : true,
	// 	segmentStrokeColor : "#fff",
	// 	segmentStrokeWidth : 2,
	// 	percentageInnerCutout : 50,
	// 	animationSteps : 100,
	// 	animationEasing : "easeOutBounce",
	// 	animateRotate : true,
	// 	animateScale : false,
	// 	responsive: true,
	// 	maintainAspectRatio: true,
	// 	showScale: true,
	// 	animateScale: true
	// });
  //   }
  }
})
