// Ignore this section 
// x--------------------------------------------------------------------------------------------x
class StarRating extends HTMLElement {
    get value () {
        return this.getAttribute('value') || 0;
    }

    set value (val) {
        this.setAttribute('value', val);
        this.highlight(this.value - 1);
    }

    get number () {
        return this.getAttribute('number') || 5;
    }

    set number (val) {
        this.setAttribute('number', val);

        this.stars = [];

        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }

        for (let i = 0; i < this.number; i++) {
            let s = document.createElement('div');
            s.className = 'star';
            this.appendChild(s);
            this.stars.push(s);
        }

        this.value = this.value;
    }

    highlight (index) {
        this.stars.forEach((star, i) => {
            star.classList.toggle('full', i <= index);
        });
    }

    constructor () {
        super();

        this.number = this.number;

        this.addEventListener('mousemove', e => {
            let box = this.getBoundingClientRect(),
                starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);

            this.highlight(starIndex);
        });

        this.addEventListener('mouseout', () => {
            this.value = this.value;
        });

        this.addEventListener('click', e => {
            let box = this.getBoundingClientRect(),
                starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);

            this.value = starIndex + 1;

            let rateEvent = new Event('rate');
            this.dispatchEvent(rateEvent);
     
	});
    }
}

customElements.define('x-star-rating', StarRating);
// x--------------------------------------------------------------------------------------------x

// Edit the movie list below
movie_list = [
	"percy"
    "Harry Potter",
    "Lord of the Rings",
    "The Dark Knight",
    "The Godfather",
    "The Shawshank Redemption"
  ];
  
// Do not edit below this line
  movie_list.forEach((item) => {
    listElement = document.createElement("div");
    listElement.className = "item";
    listElement.innerHTML += item;
    listElement.innerHTML += '<x-star-rating value="2" number="5"></x-star-rating>';
    document.getElementById("listContainer").appendChild(listElement);
  });
