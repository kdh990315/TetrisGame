import BLOCKS from "./blocks.js";

const playground = document.querySelector('.playground > ul');


//Game Setting 
const Game_Rows = 20;
const Game_Cols = 10;

//변수

let score = 0,
	TimeToFall = 500,
	downInterval,
	tempMovingItem;

const movingItem = {
		//떨어지는 블록의 정보
		type: 'T_BLOCKS',
		direction: 0,
		top: 0,
		left: 0,
	};




//함수
const init = () => {
	//떨어지는 블록의 초기 정보를 저장하여 활용함.
	tempMovingItem = {...movingItem};

	for(let i = 0; i < Game_Rows; i++) {
		addtetrisBox();
	}
	renderBlocks();

}

const addtetrisBox = () => {
	const li = document.createElement('li');
	const ul = document.createElement('ul');
	for(let j = 0; j < Game_Cols; j++) {
		const tetrisBox = document.createElement('li');

		ul.prepend(tetrisBox);
	}
	li.prepend(ul);
	playground.prepend(li);
}

const renderBlocks = () => {
	const {type, direction, top, left} = tempMovingItem;
	//arr Destructuring을 사용하여 하나하나의 값에 접근하지 말고 변수처럼 배열값을 사용한다.
	const movedBLOCK = document.querySelectorAll('.movedBLOCK');

	movedBLOCK.forEach(item => {
		item.classList.remove(type, "movedBLOCK")
	})

	BLOCKS[type][direction].forEach(BLOCK => {
		const x = BLOCK[0] + left;
		const y = BLOCK[1] + top;

		const BLOCK_target = playground.childNodes[y].childNodes[0].childNodes[x];
		//childNodes에 접근하면 자식요소를 배열로 나타내어 set()이나 foreach등으로 접근할 수 있다.
		//콘솔에 찍을 때 일반 괄호로는 안되고 ({})로 접근해야하는듯?
		BLOCK_target.classList.add(type, "movedBLOCK");

	});
}


const Rotation = () => {
	const direction = tempMovingItem.direction;
	direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction  += 1;
	renderBlocks();
	console.log(tempMovingItem.top)
	console.log(tempMovingItem.left)
}

const moveBlock = (BLOCK_type, amount) => {
	tempMovingItem[BLOCK_type] += amount;
	renderBlocks();
	console.log(tempMovingItem.top)
	console.log(tempMovingItem.left)
}

init();

document.addEventListener('keydown', e => {
	switch(e.keyCode) {
		case 37:
			moveBlock('left', -1);
			break;
		case 38:
			Rotation();
			break;
		case 39:
			moveBlock('left', 1);
			break;
		case 40:
			moveBlock('top', 1);
			break;
	}
})