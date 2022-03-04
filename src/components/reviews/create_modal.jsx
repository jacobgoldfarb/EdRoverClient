
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Modal from '@mui/material/Modal';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { useState } from 'react';
import { postReview } from '../../../api/reviews';

export default function CreateReviewModal({open, onClose, programId, programName, schoolName}) {
    const ratingOptions = [
        {
            title: "Student Life",
            body: "How would you rate the student life? From quality of campus facilities to school spirit, and everything in between.",
        },
        {
            title: "Liked it?",
            body: "How much do you like the program and the school?",
        },
        {
            title: "Difficulty",
            body: "How difficult is the program in terms of number of hours required on an average week.",
        },
        {
            title: "Preparedness",
            body: "How well did this program prepare you for real world employment? This can include undergraduate internship opportunities.",
        },
    ]

    const userTypeOptions = [
        {
            label: "anonymously",
            value: "anon"
        },
        {
          label: "with email",
          value: "known"
      },
    ]

    const [ratings, setRatings] = useState([
        {
            label: 'Student Life',
            value: 3,
        },
        {
            label: 'Liked it',
            value: 3,
        },
        {
            label: 'Difficulty',
            value: 3,
        },
        {
            label: 'Preparedness',
            value: 3,
        }
    ])
    const [review, setReview] = useState("")
    const [postType, setPostType] = useState("anon")
    const [errorText, setErrorText] = useState("")

    const onUpdateRating = (id, newValue) => {
        ratings[id].value = newValue
        setRatings(ratings)
    }

    const REVIEW_MIN = 20

    const addReview = () => {
        if (!review) {
            setErrorText("Please write a review.")
            return
        } else if (review.length < REVIEW_MIN) {
            setErrorText(`Review length should be a minimum of ${REVIEW_MIN} characters.`)
            return
        }
        const reviewObject = {
            review,
            ratings,
            postType
        }
        postReview(reviewObject, programId, (resp) => {
            onClose()
        })
    }

    return (<>
        <Modal
        open={open}
        onClose={onClose}
        className={"mx-auto mb-6 rounded-xl overflow-scroll"}
        >
            <Box className={" mt-32 w-2/3 text-center mx-auto bg-white rounded-xl"}>
                <div className={"pt-8 text-xl font-medium"}>Reviewing {programName} at {schoolName}</div>
                <div className="mt-10 flex flex-col">
                    {ratingOptions.map(
                        ({title, body}, idx) => <RatingItem key={idx} id={idx} title={title} body={body} didUpdateValue={onUpdateRating}/>
                    )}
                </div>
                <div className="mt-6 pb-10">
                    <textarea className='pl-3 pt-3 rounded-xl bg-gray-200 w-5/6 h-32' 
                    placeholder="Add any other information you’d like to share about the program."
                    onChange={(e) => setReview(e.target.value)}/>
                </div>
                <div className="ml-10 flex items-center">
                    <div className="mr-8 font-medium">{"Submit:"}</div>
                    <Dropdown options={userTypeOptions} onChange={(e) => setPostType(e.value)} value={userTypeOptions[0]} placeholder="Select an option" />
                </div>
                { errorText && <div className="mx-auto mt-4 font-semibold text-red-600">{errorText}</div>}
                <input onClick={addReview} type="submit" readOnly={true} className="mt-6 mb-8 cursor-pointer text-center w-60 text-white h-12 bg-violet-700 rounded-xl" value="Add Review"/>
            </Box>
        </Modal>
    </>)
}

function RatingItem({title, body, id, didUpdateValue}) {
    return (
        <div className="flex items-center mb-6">
            <div className="w-1/2 ml-7 text-left">
                <div className="font-semibold">{title}</div>
                <div className="mt-2 text-gray-500 text-sm">{body}</div>
            </div>
            <Slider
                className="w-1/3 mx-8 justify-self-end"
                defaultValue={3}
                aria-labelledby="discrete-slider"
                step={1}
                min={1}
                max={5}
                marks
                onChange={(e) => didUpdateValue(id, e.target.value)}
            />
        </div>
    )
}