class LocalTrabalho {
  constructor() {
    this.id = 0;
    this.arrLocaisTrabalho = [];
    this.editId = null;
  }

  //Função que adiciona e atualiza os dados
  add() {
    let data = this.getData();
    if (this.valida(data)) {
      if (this.editId == null) {
        this.arrLocaisTrabalho.push(data);
        sessionStorage.setItem(
          data.id,
          JSON.stringify(this.arrLocaisTrabalho[data.id])
        );
        this.id++;
      } else {
        this.update(this.editId, this.arrLocaisTrabalho);
      }
    }
    this.tableList();
    this.cancel();
    document.getElementById("btn1").innerText = "Adicionar";
    this.editId = null;
  }

  //Função que renderiza a tabela e seus elementos
  tableList() {
    let tbody = document.getElementById("tableBody");
    tableBody.innerText = "";
    for (let i = 0; i < this.arrLocaisTrabalho.length; i++) {
      let tr = tbody.insertRow();

      let tdPredio = tr.insertCell();
      let tdLocal = tr.insertCell();
      let tdAcao = tr.insertCell();

      let div = document.createElement("div");
      div.classList.add("action");
      let imgEdit = document.createElement("img");
      imgEdit.src = "Images/edit.svg";
      imgEdit.setAttribute(
        "onclick",
        "place.prepareUpdate(" + JSON.stringify(this.arrLocaisTrabalho[i]) + ")"
      );

      let imgDelete = document.createElement("img");
      imgDelete.src = "Images/trash.svg";
      imgDelete.setAttribute(
        "onclick",
        "place.delete(" + this.arrLocaisTrabalho[i].id + ")"
      );

      tdPredio.innerText = this.arrLocaisTrabalho[i].predio;
      tdLocal.innerText = this.arrLocaisTrabalho[i].local;
      div.appendChild(imgEdit);
      div.appendChild(imgDelete);
      tdAcao.appendChild(div);
      this.cancel();
    }
  }

  //Função que valida o preenchimento dos campos do formulário
  valida(data) {
    let msg = "";
    if (data.predio == "") {
      msg += "Informe o Prédio \n";
    }
    if (data.local == "") {
      msg += "Informe o local \n";
    }
    if (msg != "") {
      alert(msg);
      return false;
    }
    return true;
  }

  //função que captura os dados do formulário
  getData() {
    let data = {};
    data.id = this.id;
    data.predio = document.getElementById("predio").value;
    data.local = document.getElementById("local").value;
    return data;
  }

  //Função que limpa os dados do formulário
  cancel() {
    document.getElementById("predio").value = "";
    document.getElementById("local").value = "";
  }

  //Função que prepara os dados para atualização, alimentando-os nos campos do formulário
  prepareUpdate(dados) {
    this.editId = dados.id;
    document.getElementById("predio").value = dados.predio;
    document.getElementById("local").value = dados.local;
    document.getElementById("btn1").innerText = "Atualizar";
  }

  //Funçãoq ue atualiza os dados no array e na sessionStorage
  update(id) {
    for (let i = 0; i < this.arrLocaisTrabalho.length; i++) {
      if (this.arrLocaisTrabalho[i].id == id) {
        this.arrLocaisTrabalho[i].predio =
          document.getElementById("predio").value;
        this.arrLocaisTrabalho[i].local =
          document.getElementById("local").value;
        sessionStorage.removeItem(id);
        sessionStorage.setItem(id, JSON.stringify(this.arrLocaisTrabalho[i]));
      }
    }
  }

  //Função que deleta o item do array e da sessionStorage
  delete(id) {
    if (confirm("Deletar o registro?")) {
      let tbody = document.getElementById("tableBody");
      for (let i = 0; i < this.arrLocaisTrabalho.length; i++) {
        if (this.arrLocaisTrabalho[i].id == id) {
          this.arrLocaisTrabalho.splice(i, 1);
          tbody.deleteRow(i);
          sessionStorage.removeItem(id);
        }
      }
    }
  }
}

var place = new LocalTrabalho();
