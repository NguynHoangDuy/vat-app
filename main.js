function Comma(Num) { //function to add commas to textboxes
            Num += '';
            Num = Num.replace(',', '');
            Num = Num.replace('.', '');
            Num = Num.replace('.', '');
            Num = Num.replace(',', '');
            Num = Num.replace('.', '');
            Num = Num.replace('.', '');
            x = Num.split(',');
            x1 = x[0];
            x2 = x.length > 1 ? ',' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1))
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            return x1 + x2;
        }

const btnSubmit =document.querySelector(".btn-submit")
const money = document.querySelector(".input-number")
const vat = document.querySelector(".vat-number")

money.addEventListener("input", ()=>{
  
  money.value = Number(Number(money.value.replaceAll(",", "")).toFixed(1)).toLocaleString("en")
})
btnSubmit.addEventListener("click", (e)=>{
    if(document.querySelector(".noti"))
    {
        // console.log()
        document.querySelector(".container").removeChild(document.querySelector(".noti"))
    }
    e.preventDefault()
    let tienChuaThue
    let tienCoThue
    let tienVat
    if(document.getElementById("xuoi").checked == true)
    {
        tienChuaThue = Number(money.value.replaceAll(",", ""));
        tienVat = Math.round(tienChuaThue * 10 /100);
        tienCoThue = Math.round(Number(tienChuaThue) + Number(tienVat));
    }
    else{
        tienCoThue = Number(money.value.replaceAll(",", ""));
        tienChuaThue = Math.round(Number(tienCoThue)*100 /  (Number(vat.value)+ 100));
        tienVat = Math.round(Number(tienCoThue) - Number(tienChuaThue));
    }
    let template = `<div class="noti">
    <p> Số tiền chưa thuế: ${Number(Number(tienChuaThue).toFixed(1)).toLocaleString("en")}</p>
    <p> Số tiền thuế: ${Number(Number(tienVat).toFixed(1)).toLocaleString("en")}</p>
    <p> Số tiền sau thuế: ${Number(Number(tienCoThue).toFixed(1)).toLocaleString("en")}</p>
    <span> Bằng chữ:
        <p class="noti-money">${to_vietnamese(tienCoThue)}</p>
    </span>
</div>`
console.log("hello")
    document.querySelector(".container").insertAdjacentHTML("beforeend", template)
})





const defaultNumbers =' hai ba bốn năm sáu bảy tám chín';

const chuHangDonVi = ('1 một' + defaultNumbers).split(' ');
const chuHangChuc = ('lẻ mười' + defaultNumbers).split(' ');
const chuHangTram = ('không một' + defaultNumbers).split(' ');

function convert_block_three(number) {    
  if(number == '000') return '';
  var _a = number + ''; //Convert biến 'number' thành kiểu string

  //Kiểm tra độ dài của khối
  switch (_a.length) {
    case 0: return '';
    case 1: return chuHangDonVi[_a];
    case 2: return convert_block_two(_a);
    case 3: 
      var chuc_dv = '';
      if (_a.slice(1,3) != '00') {
        chuc_dv = convert_block_two(_a.slice(1,3));
      }
      var tram = chuHangTram[_a[0]] + ' trăm';
      return tram + ' ' + chuc_dv;
  }
}

function convert_block_two(number) {
  var dv = chuHangDonVi[number[1]];
  var chuc = chuHangChuc[number[0]];
  var append = '';

  // Nếu chữ số hàng đơn vị là 5
  if (number[0] > 0 && number[1] == 5) {
    dv = 'lăm'
  }

  // Nếu số hàng chục lớn hơn 1
  if (number[0] > 1) {
    append = ' mươi';
    
    if (number[1] == 1) {
      dv = ' mốt';
    }
  }

  return chuc + '' + append + ' ' + dv; 
}

const dvBlock = '1 nghìn triệu tỷ'.split(' ');

function to_vietnamese(number) {
  var str = parseInt(number) + '';
  var i = 0;
  var arr = [];
  var index = str.length;
  var result = [];
  var rsString = '';

  if (index == 0 || str == 'NaN') {
    return '';
  }

  // Chia chuỗi số thành một mảng từng khối có 3 chữ số
  while (index >= 0) {
    arr.push(str.substring(index, Math.max(index - 3, 0)));
    index -= 3;
  }

  // Lặp từng khối trong mảng trên và convert từng khối đấy ra chữ Việt Nam
  for (i = arr.length - 1; i >= 0; i--) {
    if (arr[i] != '' && arr[i] != '000') {
      result.push(convert_block_three(arr[i]));

      // Thêm đuôi của mỗi khối
      if (dvBlock[i]) {
        result.push(dvBlock[i]);
      }
    }
  }

  // Join mảng kết quả lại thành chuỗi string
  rsString = result.join(' ');

  // Trả về kết quả kèm xóa những ký tự thừa
  return rsString.replace(/[0-9]/g, '').replace(/ /g,' ').replace(/ $/,'');
}


function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 46 || charCode > 31 && (charCode < 48 || charCode > 57)){
        evt.preventDefault();
        return false;
    }
    return true;
}
document.querySelectorAll("input").forEach((number)=>{
    number.addEventListener("keypress", function(event){
            return isNumberKey(event) }, false)
})
