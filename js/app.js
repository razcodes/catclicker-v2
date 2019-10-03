let CAT_AMOUNT = 7;
const menu = document.getElementById("menu");
const container = document.getElementById("container");

var model = {
	createCat: function(catNum) {
		return newCat = {
			url: `img/cat${catNum}.jpg`,
			number: catNum,
			clicks: 0
		}
	},
	createCatArray: function() {
		var catList = [];
		for(let i=1; i<=CAT_AMOUNT; i++){
			catList.push(this.createCat(i));
		}
		return catList;
	},
	addClick: function(cat) {
		cat.clicks++;
	}
};

var octopus = {
	getCats: function() {
		return model.createCatArray();
	},
	addClick: (cat) => {
		model.addClick(cat);
	},
	hideCats: function() {
		let visibleCats = document.querySelectorAll(".show");
		let visibleCatsArray = Array.prototype.slice.call(visibleCats);
		visibleCatsArray.forEach((cat) => {
			cat.classList.remove("show");
		});
	},
	attachDetailToButton: function(newCatButton, cat) {
		detailView.attachDetail(newCatButton, cat);
	},
	init: function() {
		listView.render();
		detailView.render();
	}
};

var listView = {
	createCatButton: function(cat) {
		let newCatButton = document.createElement("BUTTON");
		newCatButton.innerHTML = "Cat "+cat.number;
		octopus.attachDetailToButton(newCatButton, cat);
		menu.appendChild(newCatButton);
	},
	createButtonList: function() {
		let cats = octopus.getCats();
		for(cat of cats){
			this.createCatButton(cat);
		}
	},
	render: function() {
		this.createButtonList();
	}
};

var detailView = {
	createCatView: function(cat) {
		let newCatView = document.createElement("DIV");
		newCatView.innerHTML = `<div id="cat${cat.number}"><h2>Cat ${cat.number}:<br \></h2><img src="${cat.url}" alt="cat pic"><p>Clicks: ${cat.clicks}</p></div>`;
		newCatView.addEventListener("click", () => {
			octopus.addClick(cat);
			newCatView.querySelector("p").innerHTML = `Clicks: ${cat.clicks}`;
		});
		newCatView.classList.add("hide");
		container.appendChild(newCatView);
	},
	attachDetail: function(button, cat){
		let catName = "cat"+cat.number;
		button.addEventListener("click", (cat) => {	
			octopus.hideCats();
			let test = document.getElementById(catName);
			test.parentNode.classList.toggle("show");
		});
	},
	render: function() {
		let cats = octopus.getCats();
		cats.forEach((cat) => {
			this.createCatView(cat);
		});
	}
};
octopus.init();