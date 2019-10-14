// Global variables
let nameInput = document.getElementById('name-input');
let urlInput = document.getElementById('url-input');
let clicksInput = document.getElementById('clicks-input');

var model = {
	currentCat: null,
	cats: [
		{
			name: "George",
			url: "img/cat1.jpg",
			clickCount: 0
		},
		{
			name: "Michael",
			url: "img/cat2.jpg",
			clickCount: 0
		},
		{
			name: "Fredrik",
			url: "img/cat3.jpg",
			clickCount: 0
		},
		{
			name: "Frank",
			url: "img/cat4.jpg",
			clickCount: 0
		},
		{
			name: "Simon",
			url: "img/cat5.jpg",
			clickCount: 0
		},
		{
			name: "Caroline",
			url: "img/cat6.jpg",
			clickCount: 0
		},
		{
			name: "Shay",
			url: "img/cat7.jpg",
			clickCount: 0
		}
	]
};

var octopus = {
	changeAdminFields: () => {
		let currentCat = model.currentCat;

		nameInput.value = currentCat.name;
		urlInput.value = currentCat.url;
		clicksInput.value = currentCat.clickCount;
	},
	clearAdminFields: () => {
		let inputs = document.querySelectorAll('input');
		let inputsArray = Array.prototype.slice.call(inputs);
		inputsArray.forEach((input) => {
			input.value = "";
		});
	},
	changeCurrentCatName: (name) => {
		let currentCat = document.getElementById(model.currentCat.name);
		currentCat.textContent = name;
		model.currentCat.name = name;
		currentCat.setAttribute('id', name);
	},
	changeCurrentCatURL: (url) => {
		model.currentCat.url = url;
	},
	changeCurrentCatClicks: (clicks) => {
		model.currentCat.clickCount = clicks;
	},
	toggleVisibility: (element) => {
		element.classList.toggle('hide');
	},
	hideAdminPanel: () => {
		document.getElementById('admin-panel').classList.add('hide');
	},
	getCats: () => {
		return model.cats;
	},
	getCurrentCat: () => {
		return model.currentCat;
	},
	setCurrentCat: (cat) => {
		model.currentCat = cat;
	},
	addCount: () => {
		model.currentCat.clickCount++;
		detailView.render();
	},
	init: () => {
		model.currentCat = model.cats[0];
		listView.init();
		detailView.init();
		adminView.init();
	}
};

var adminView = {
	init: () => {
		this.adminButton = document.getElementById('admin-button');
		this.adminPanel = document.getElementById('admin-panel');
		this.cancelButton = document.getElementById('cancel-button');
		this.saveButton = document.getElementById('save-button');

		cancelButton.addEventListener('click', () => {
			octopus.toggleVisibility(adminPanel);
			octopus.clearAdminFields();
		});

		nameInput.addEventListener('input', (e) => {
			newName = e.target.value;
		});
		urlInput.addEventListener('input', (e) => {
			newURL = e.target.value;
		});
		clicksInput.addEventListener('input', (e) => {
			newClicks = e.target.value;
		});

		adminView.render();
	},
	render: () => {
		adminButton.addEventListener('click', () => {
			octopus.toggleVisibility(adminPanel);
			octopus.changeAdminFields();
		});	

		this.saveButton.addEventListener('click', () => {
			if(typeof newName !== 'undefined'){
				octopus.changeCurrentCatName(newName);
			}
			if(typeof newURL !== 'undefined'){
				octopus.changeCurrentCatURL(newURL);
			}
			if(typeof newClicks !== 'undefined' && newClicks > -1){
				octopus.changeCurrentCatClicks(newClicks);
			}
			octopus.toggleVisibility(adminPanel);
			octopus.clearAdminFields();
			detailView.render();
		});
	}
};

var detailView = {
	init: () => {
		this.catElement = document.getElementById('cat');
		this.catName = document.getElementById('cat-name');
		this.catImage = document.getElementById('cat-image');
		this.catCount = document.getElementById('cat-count');

		// Adding click counts to the current cat
		catImage.addEventListener('click', () => {
			octopus.addCount();
		});

		detailView.render();
	},
	render: () => {
		// Updates the current cat's elements
		let currentCat = octopus.getCurrentCat();
		this.catName.textContent = currentCat.name;
		this.catCount.textContent = currentCat.clickCount;
		this.catImage.src = currentCat.url;
	}
};

var listView = {
	init: () => {
		this.menu = document.getElementById('menu');

		listView.render(); 
	},
	render: () => {
		let cats = octopus.getCats();
		this.menu.innerHTML = "";

		for(let i=0; i<cats.length; i++){
			let cat = cats[i];
			let catButton = document.createElement('button');
			let catAttr = document.createAttribute("id");
			catAttr.value = cat.name;
			catButton.textContent = cat.name;
			catButton.setAttributeNode(catAttr);

			catButton.addEventListener('click', ((cat) => {
				return () => {
					octopus.setCurrentCat(cat);
					octopus.hideAdminPanel();
					detailView.render();
					newName = octopus.getCurrentCat().name;
					newURL = octopus.getCurrentCat().url;
					newClicks = octopus.getCurrentCat().clickCount;
				};
			})(cat));

			this.menu.appendChild(catButton);
		};
	}
};

octopus.init();