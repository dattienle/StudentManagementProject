// C1: Prototype (function constructor - không dùng class)
// tạo constructor chuyện tạo ra Student

// function Student(name, birthday) {
//     this.name = name;
//     this.birthday = birthday;
//     this.id = new Date().toISOString();
// }
// --Store : cái kho
// function Store() { }
// // getStudents : method dùng để lấy danh sách từ localStorage, nếu chưa có thì 
// // trả ra mảng rỗng
// Store.prototype.getStudents = function () {
//     return JSON.parse(localStorage.getItem('students')) || [];
// };
// // add lưu student vào localStorage
// Store.prototype.add = function (student) {
//     const students = this.getStudents();//lấy danh sách từ store
//     students.push(student); // thêm student mới vào danh sách
//     // cập nhật danh sách lên lại store
//     localStorage.setItem('students', JSON.stringify(students))
// }
// // getStudent: lấy sinh viên dựa trên id
// Store.prototype.getStudent = function (idRemove){
//     const students = this.getStudents();
//     return students.find(student => student.id === idRemove)
// }
// // remove : xóa student khỏi danh sách trong store
// Store.prototype.remove = function (idRemove){
//     const students = this.getStudents();
//     const indexRemove = students.findIndex((student) => student.id == idRemove)
//     students.splice(indexRemove,1);
//     localStorage.setItem('students',JSON.stringify(students))
// }

// --renderUI: cái giao diện
// function RenderUI() { };
//  method add : add student lên màn hình 
// RenderUI.prototype.add = function (student) {
//     const students = new Store().getStudents();
//     const newTr = document.createElement('tr');
//     newTr.innerHTML = `
//     <td>${students.length + 1}</td>
//     <td>${student.name}</td>
//     <td>${student.birthday}</td>
//     <td>
//         <button class="btn btn-danger btn-sm btn-remove" data-id="${student.id}">Xóa</button>
//     </td>
//     `;
//     document.querySelector("tbody").appendChild(newTr);
//     document.querySelector("#name").value = "";
//     document.querySelector("#birthday").value = "";
// };
// // renderAll: render tất cả student trong store lên màn hình
// RenderUI.prototype.renderAll = function () {
//     document.querySelector("tbody").innerHTML = ""; // clear nội dung cũ
//     const students = new Store().getStudents(); //lấy danh sách từ store
//     // duyệt danh sách và gọi renderUI.add cho mỗi item(dang là student)
//     let content = students.reduce((result, student, studentIndex) => {
//         return (result = result + `
//          <tr>
//         <td>${studentIndex + 1}</td>
//         <td>${student.name}</td>
//         <td>${student.birthday}</td>
//         <td>
//             <button class="btn btn-danger btn-sm btn-remove" data-id="${student.id}">Xóa</button>
//         </td>
//         </tr>
//         `);
//     }, "");
//     document.querySelector("tbody").innerHTML = content;
// }
//Alert : dùng để thông báo kết quả add
// RenderUI.prototype.alert = function (msg, type = "success") {
//     const newAlert = document.createElement("div");
//     newAlert.innerHTML = msg;
//     newAlert.className = `alert alert-${type}` //đặt class và màu cho nó 
//     document.querySelector("#notification").appendChild(newAlert)
//     // xóa thông điệp
//     setTimeout(() => {
//         newAlert.remove();
//     }, 2000)
// }

// sự kiện chính 
document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    // tạo ra các object quản lý
    const store = new Store();
    const ui = new RenderUI();
    const name = document.querySelector("#name").value;
    const birthday = document.querySelector("#birthday").value;
    // từ name và birthday tạo Student
    const newStudent = new Student(name, birthday);
    ui.add(newStudent);
    store.add(newStudent);
    ui.alert(`Bạn vừa thêm thành công ${name}`)
});
// DOMContentLoaded : nội dung trong html load xong thì mới chạy
document.addEventListener("DOMContentLoaded", event => {
    const ui = new RenderUI();
    ui.renderAll();
})
// -------------------Chuyển cách viết Class--------------
// class Student
class Student{
     constructor(name, birthday) {
            this.name = name;
            this.birthday = birthday;
            this.id = new Date().toISOString();
        }
}
// class Store
class Store{
    constructor(){}
// getStudents : method dùng để lấy danh sách từ localStorage, nếu chưa có thì 
    getStudents() {
        return JSON.parse(localStorage.getItem('students')) || [];
    };
    // add lưu student vào localStorage
    add(student) {
        const students = this.getStudents();//lấy danh sách từ store
        students.push(student); // thêm student mới vào danh sách
        // cập nhật danh sách lên lại store
        localStorage.setItem('students', JSON.stringify(students))
    }
    // getStudent: lấy sinh viên dựa trên id
    getStudent (idRemove){
        const students = this.getStudents();
        return students.find(student => student.id === idRemove)
    }
    // remove : xóa student khỏi danh sách trong store
    remove(idRemove){
        const students = this.getStudents();
        const indexRemove = students.findIndex((student) => student.id == idRemove)
        students.splice(indexRemove,1);
        localStorage.setItem('students',JSON.stringify(students))
    }
}
// class UI
class RenderUI{
    constructor(){}
add(student) {
    const students = new Store().getStudents();
    const newTr = document.createElement('tr');
    newTr.innerHTML = `
    <td>${students.length + 1}</td>
    <td>${student.name}</td>
    <td>${student.birthday}</td>
    <td>
        <button class="btn btn-danger btn-sm btn-remove" data-id="${student.id}">Xóa</button>
    </td>
    `;
    document.querySelector("tbody").appendChild(newTr);
    document.querySelector("#name").value = "";
    document.querySelector("#birthday").value = "";
};
// renderAll: render tất cả student trong store lên màn hình
renderAll () {
    document.querySelector("tbody").innerHTML = ""; // clear nội dung cũ
    const students = new Store().getStudents(); //lấy danh sách từ store
    // duyệt danh sách và gọi renderUI.add cho mỗi item(dang là student)
    let content = students.reduce((result, student, studentIndex) => {
        return (result = result + `
         <tr>
        <td>${studentIndex + 1}</td>
        <td>${student.name}</td>
        <td>${student.birthday}</td>
        <td>
            <button class="btn btn-danger btn-sm btn-remove" data-id="${student.id}">Xóa</button>
        </td>
        </tr>
        `);
    }, "");
    document.querySelector("tbody").innerHTML = content;
}
alert (msg, type = "success") {
    const newAlert = document.createElement("div");
    newAlert.innerHTML = msg;
    newAlert.className = `alert alert-${type}` //đặt class và màu cho nó 
    document.querySelector("#notification").appendChild(newAlert)
    // xóa thông điệp
    setTimeout(() => {
        newAlert.remove();
    }, 2000)
}

}
// sự kiện xóa
document.querySelector("tbody").addEventListener("click", event => {
    if (event.target.classList.contains("btn-remove")){
        const idRemove = event.target.dataset.id;//Lấy data-id của nút vừa nhấn 
        const store = new Store(); 
        // từ id tìm ra thông tin của Student: store
        const ui = new RenderUI();
        
        const student = store.getStudent(idRemove); 
         const isConfirmed = confirm(`Bạn có muốn xóa ${student.name}`); 
        if(isConfirmed){
            store.remove(idRemove); 
            ui.renderAll(); 
            ui.alert(`Bạn đã xóa ${student.name}`);
        }
    }
})