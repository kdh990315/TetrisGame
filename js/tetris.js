import BLOCKS from "./blocks.js";

const playground = document.querySelector('.playground > ul');
const gameOver = document.querySelector('.gameover');
const scoreDisplay = document.querySelector('.score');
const RestartBtn = document.querySelector('.gameover > button');



//변수

let score = 0,
	fallingSpeed = 500,
	downInterval,
	tempMovingItem;

const movingItem = {
		type: '',
		direction: 0,
		top: 0,
		left: 4,
};

//Game Setting 
const Game_Rows = 20;
const Game_Cols = 10;


//함수

const init = () => {
	//떨어지는 블록의 초기 정보를 저장하여 활용함.
	tempMovingItem = {...movingItem};

	for(let i = 0; i < Game_Rows; i++) {
		addtetrisline();
	}
	BlockGenerator();

}

const addtetrisline = () => {
	const li = document.createElement('li');
	const ul = document.createElement('ul');
	for(let j = 0; j < Game_Cols; j++) {
		const tetrisBox = document.createElement('li');

		ul.prepend(tetrisBox);
	}
	li.prepend(ul);
	playground.prepend(li);
}

const renderBlocks = (BLOCK_type) => {
	const {type, direction, top, left} = tempMovingItem;
	//arr Destructuring을 사용하여 하나하나의 값에 접근하지 말고 변수처럼 배열값을 사용한다.
	const movedBLOCK = document.querySelectorAll('.movedBLOCK');

	movedBLOCK.forEach(item => {
		item.classList.remove(type, "movedBLOCK")
	})

	BLOCKS[type][direction].some(BLOCK => {
		const x = BLOCK[0] + left;
		const y = BLOCK[1] + top;

		const BLOCK_target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
		//childNodes에 접근하면 자식요소를 배열로 나타내어 set()이나 foreach등으로 접근할 수 있다.
		//콘솔에 찍을 때 일반 괄호로는 안되고 ({})로 접근해야하는듯?

		const isAvailable = checkEmpty(BLOCK_target);

		if(isAvailable) {
			BLOCK_target.classList.add(type, "movedBLOCK");
		} else {
			tempMovingItem = { ...movingItem };
			if(BLOCK_type ==='retry'){
				clearInterval(downInterval);
				GameOver();
			}

			setTimeout(() => {
				renderBlocks('retry');

				if(BLOCK_type === "top") {
					fixedBlock();
				}
			}, 0);

			return true;
		}


	});

	movingItem.left = left;
	movingItem.top = top;
	movingItem.direction = direction;
}

const fixedBlock = () => {
	const movingBlocks = document.querySelectorAll('.movedBLOCK');
	movingBlocks.forEach(item => {
		item.classList.remove('movedBLOCK');
		item.classList.add('fixed')
	});
	clearBlock();
	// BlockGenerator();
}

const clearBlock = () => {

	const childNodes = playground.childNodes;
	childNodes.forEach(item => {
		let clear = true;
		item.children[0].childNodes.forEach(li => {
			if(!li.classList.contains('fixed')) {
				clear = false
			};
		});
		if(clear) {
			item.remove();
			addtetrisline();
			score++;
			scoreDisplay.innerHTML = score;
			
			//난이도 조절
			if(score % 10 === 0 && score !== 0) {
				fallingSpeed = fallingSpeed / 1.5;
			}
		}
		// console.log(item.children[0].childNodes)
	})


	BlockGenerator()
}


const BlockGenerator = () => {
	clearInterval(downInterval);


	downInterval = setInterval(() => {
		moveBlock('top', 1);

	}, fallingSpeed)



	const BLOCKS_arr = Object.entries(BLOCKS);
	const randomBlockIndex = Math.floor(Math.random() * BLOCKS_arr.length);


	movingItem.type = BLOCKS_arr[randomBlockIndex][0];
	movingItem.top = 0;
	movingItem.left = 3;
	movingItem.direction = 0;
	tempMovingItem = {...movingItem};
	renderBlocks();
}

const checkEmpty = (target) => {
	if(!target || target.classList.contains('fixed')) {
		return false
	}
	return true;
}


const Rotation = () => {
	const direction = tempMovingItem.direction;
	direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction  += 1;
	renderBlocks();

}

const moveBlock = (BLOCK_type, amount) => {
	tempMovingItem[BLOCK_type] += amount;
	renderBlocks(BLOCK_type);

}

//스페이스바를 누를 때 실행
const DropBlock = () => {
	clearInterval(downInterval);

	downInterval = setInterval(() => {
		moveBlock('top', 1);
	}, 10);
}

const GameOver = () => {
	gameOver.style.display = 'flex';
}

init();


//EventListener
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
		case 32:
			DropBlock();
	}
});

RestartBtn.addEventListener('click', () => {
	playground.innerHTML = '';
	gameOver.style.display = 'none';
	init();
});