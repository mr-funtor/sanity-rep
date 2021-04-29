import React, {useState, useEffect} from 'react';
import {useGlobalContext} from './context';

const data=[
	{
            "category": "Entertainment: Music",
            "type": "multiple",
            "difficulty": "easy",
            "question": "Which rap group released the album &quot;Straight Outta Compton&quot;?",
            "correct_answer": "N.W.A",
            "incorrect_answers": [
                "Wu-Tang Clan",
                "Run-D.M.C.",
                "Beastie Boys"
            ]
        },
        {
            "category": "Entertainment: Music",
            "type": "multiple",
            "difficulty": "easy",
            "question": "Ringo Starr of The Beatles mainly played what instrument?",
            "correct_answer": "Drums",
            "incorrect_answers": [
                "Bass",
                "Guitar",
                "Piano"
            ]
        }
]

const QuestionsBox=()=>{
	const {dispatch,increaseScore,switchPlayer,answered,rollDice,playerOne,playerTwo,
	setAnswered,questionValue,rollDiceRef,presentPlayer,numberofPlayer,
	// computerPlays,
	dNumberPicked, setDNumberPicked,answerIndex, setAnswerIndex,gameStarted,digQuestion, setDigQuestion}=useGlobalContext();
	// const [playNumb, setPlayNumb]=useState(0)
	const [questions, setQuestions]=useState(data);
	const [answers,setAnswers]=useState([]);
	const [singleQuestion, setSingleQuestion]=useState('');
	const [computerTrig, setComputerTrig]=useState(false);
	const [computerAnswering, setComputerAnswering]=useState(false);
	const [coco,setCoco]=useState(false);
	
	// const [pickedCorrect,setPickedCorrect]=useState(false);
	
	

	const{question, correct_answer,incorrect_answers}=questions[questionValue];
	

	useEffect(()=>{
		console.log('outside fetching question')
		// if(!gameStarted)return;//stops the fetching of question if the game hasn't started
		if(digQuestion){
			setDigQuestion(false);
			// dispatch({type:'DIG_QUESTION',payload:false});//returns the trigger for the useEffect back to false
			
			console.log('inside fetching question');
			
			//set the questions into the useState
			setAnswers(incorrect_answers)
			
			setAnswers((answers)=>{
				return [...answers,correct_answer ]
				
			})
			
			//rearrange the order of the questions 
			setAnswers((answers)=>{
				return answers.sort(()=>0.5-Math.random())
			})
			console.log(answers);
			setSingleQuestion((singleQuestion)=>{
				let formatQuestion=question.replace('&quot;', '"');
				formatQuestion=formatQuestion.replace('&quot;', '"');
				let reformat=question.replace('&#039;','\'')
				return formatQuestion;
			})
			
			setCoco(true);
		}
	},[digQuestion])
	
	useEffect(()=>{
		if(coco){
			
			setCoco(false);
			
			console.log('answers chooser',answers);
		}
		
	},[coco])
	
	const pickAnswer=(numberPicked)=>{
		setDNumberPicked(numberPicked);
		let newIndex= answers.indexOf(correct_answer);
			console.log(newIndex,answers,correct_answer);
		setAnswerIndex(newIndex);
		console.log('in picked answerIndex', answerIndex);
		
		setAnswered(true);
		
		// console.log(correct_answer);
		
	}
	
	useEffect(()=>{
		if(answered){
			setAnswered(false);
			
			const singles=document.querySelectorAll('.single-question')
		
			if(dNumberPicked===answerIndex){
				console.log('simmer');
				//this means the answer is correct
				singles[dNumberPicked].classList.add('correct');
				increaseScore(10);
				
			}else if(dNumberPicked!==answerIndex) {
				//this means the answer is wrong
				
			singles[`${dNumberPicked ||0}`].classList.add('wrong');
				singles[`${answerIndex ||0}`].classList.add('correct')
				console.log('not simmerr');
				
			}
			
			setTimeout(()=>{
				singles[dNumberPicked].classList.remove('wrong');
				singles[answerIndex].classList.remove('correct');
				
				rollDiceRef.current.classList.remove('unclick');
			},2000)
			
			setTimeout(()=>{
				switchPlayer();
				
			},1500);
			
			
			
			
		}
		console.log('inside answering',answered);
		
		
		
	},[answered])
	
	
	return(
		<div className="questions-box">
			<h3 className="question-bar">{singleQuestion}</h3>
			<div className="answers-bar">
				{
				answers.map((item, index)=>{
					
					
					return<p onClick={()=>pickAnswer(index)}
						className="single-question"
						key={index}><span>{index+1}</span>{item}</p>
				})
				}
			</div>
		</div>
	)
	
}




export default QuestionsBox;