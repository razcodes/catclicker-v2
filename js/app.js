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
			catButton.textContent = cat.name;

			catButton.addEventListener('click', ((cat) => {
				return () => {
					octopus.setCurrentCat(cat);
					detailView.render();
				};
			})(cat));

			this.menu.appendChild(catButton);
		};
	}
};

octopus.init();