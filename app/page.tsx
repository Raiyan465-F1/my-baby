"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const messages = [
	"",
	"Are you sure?",
	"Really sure?",
	"Think again!",
	"Last chance!",
	"Surely you're kidding?",
	"You're breaking my heart 💔",
];

function Fireworks() {
	return (
		<div className="fireworks">
			{[...Array(10)].map((_, i) => (
				<div
					key={_}
					className="firework"
					style={{
						left: `${Math.random() * 100}%`,
						top: `${Math.random() * 100}%`,
						animationDelay: `${Math.random() * 2}s`,
					}}
				/>
			))}
		</div>
	);
}

function FallingHearts() {
	return (
		<div className="falling-hearts">
			{[...Array(20)].map((_, i) => (
				<div
					key={_}
					className="heart"
					style={{
						left: `${Math.random() * 100}%`,
						animationDuration: `${Math.random() * 3 + 2}s`,
						animationDelay: `${Math.random() * 2}s`,
					}}
				>
					❤️
				</div>
			))}
		</div>
	);
}

function SpinningCats() {
	return (
		<div className="spinning-cats">
			{[...Array(15)].map((_, i) => (
				<motion.div
					key={_}
					className="spinning-cat"
					initial={{ scale: 0, rotate: 0 }}
					animate={{
						scale: [0, 1, 1, 0],
						rotate: [0, 360, 720, 1080],
						x: [
							0,
							Math.random() * 200 - 100,
							Math.random() * 400 - 200,
							Math.random() * 200 - 100,
							0,
						],
						y: [
							0,
							Math.random() * 200 - 100,
							Math.random() * 400 - 200,
							Math.random() * 200 - 100,
							0,
						],
					}}
					transition={{
						duration: Math.random() * 3 + 5,
						ease: "easeInOut",
						times: [0, 0.2, 0.8, 1],
						repeat: Number.POSITIVE_INFINITY,
						repeatDelay: Math.random() * 2,
					}}
					style={{
						position: "absolute",
						left: `${Math.random() * 100}%`,
						top: `${Math.random() * 100}%`,
					}}
				>
					<Image
						src="/placeholder.svg?height=100&width=100"
						alt="Spinning cat"
						width={100}
						height={100}
					/>
				</motion.div>
			))}
		</div>
	);
}

const bounceAnimation = {
	y: [0, -20, 0],
	scale: [1, 1.2, 1],
	transition: {
		duration: 0.6,
		repeat: Number.POSITIVE_INFINITY,
		repeatType: "reverse" as const,
	},
};

function AnimatedText({ text }: { text: string }) {
	return (
		<div className="flex justify-center">
			<motion.span
				animate={bounceAnimation}
				style={{ display: "inline-block" }}
				transition={{
					delay: 0.05,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: "reverse",
				}}
				className="text-4xl font-bold text-pink-600"
			>
				{text}
			</motion.span>
		</div>
	);
}

export default function ValentinePage() {
	const [currentMessage, setCurrentMessage] = useState(0);
	const [noButtonSize, setNoButtonSize] = useState(100);
	const [yesButtonSize, setYesButtonSize] = useState(100);
	const [showNoButton, setShowNoButton] = useState(true);
	const [popNoButton, setPopNoButton] = useState(false);
	const [showCelebration, setShowCelebration] = useState(false);

	useEffect(() => {
		if (showCelebration) {
			const timer = setTimeout(() => setShowCelebration(false), 8000);
			return () => clearTimeout(timer);
		}
	}, [showCelebration]);

	const handleNoClick = () => {
		if (currentMessage < messages.length - 2) {
			setCurrentMessage(currentMessage + 1);
			setNoButtonSize(Math.max(noButtonSize - 15, 0));
			setYesButtonSize(yesButtonSize + 15);
		} else if (currentMessage === messages.length - 2) {
			setCurrentMessage(currentMessage + 1);
			setPopNoButton(true);
			setTimeout(() => setShowNoButton(false), 500); // Hide button after pop animation
		} else {
			setShowNoButton(false);
		}
	};

	const handleYesClick = () => {
		setCurrentMessage(messages.length);
		setShowCelebration(true);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4 overflow-hidden">
			{showCelebration && (
				<>
					<Fireworks />
					<FallingHearts />
					<SpinningCats />
				</>
			)}
			<motion.div
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="text-center z-10"
			>
				{currentMessage < messages.length ? (
					<>
						<h2 className="text-2xl font-bold text-pink-500 mb-4">
							{messages[currentMessage]}
						</h2>
						<h1 className="text-4xl font-bold text-pink-600 mb-8">
							Will you be my valentine?
						</h1>
						<div className="space-x-4">
							<motion.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								style={{ fontSize: `${yesButtonSize}%` }}
								className="bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition duration-300"
								onClick={handleYesClick}
							>
								Yes
							</motion.button>
							<AnimatePresence>
								{showNoButton && (
									<motion.button
										key="no-button"
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.95 }}
										style={{ fontSize: `${noButtonSize}%` }}
										className="bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition duration-300"
										onClick={handleNoClick}
										animate={
											popNoButton
												? {
														scale: [1, 1.2, 0],
														rotate: [0, 0, 180],
														opacity: [1, 1, 0],
													}
												: {}
										}
										transition={
											popNoButton
												? {
														duration: 0.5,
														times: [0, 0.3, 1],
													}
												: {}
										}
										exit={{ scale: 0, opacity: 0 }}
									>
										No
									</motion.button>
								)}
							</AnimatePresence>
						</div>
					</>
				) : (
					<AnimatedText text="I knew you couldn't say no! 💖" />
				)}
			</motion.div>
		</div>
	);
}
