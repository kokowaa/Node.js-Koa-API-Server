// 隐式绑定this
// 通过对象绑定一个方法 并且通过此对象来调用此方法 方法里面的this就是对象本身
const app = {
  name: 'app',
  age: 36
}

const sd = function(){
  console.log(this);
}

app.sd = sd;
app.sd();