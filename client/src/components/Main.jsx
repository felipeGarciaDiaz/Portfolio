import React, { useState, useEffect, useRef } from "react";
import Helmet from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.cjs";
import socket from "./socket";
import Socials from "./Socials";
//dependencies and other components we have
function Main(props) {
	//init hooks
	AOS.init();
	let intro = useRef("FELIPE GARCIA DIAZ");
	let [climber, setClimber] = useState(0);
	let [descClimber, setDescClimber] = useState(0);
	let [opacitySet, changeOpacity] = useState(0);
	let tagline = useRef("Web Developer & Security Enthusiast");
	let displayIcon = useRef("hidden");
	let [buttonOpacity, changeButtonOpacity] = useState(0);
	const socialMedia = [
		{
			link: "https://www.linkedin.com/in/felipe-garcia-diaz-a91106211/",
			icon: "linkedin",
		},
		{
			link: "https://github.com/felipegarciadiaz",
			icon: "github",
		},
		{
			link: "https://www.youtube.com/channel/UCBiscYqco2N8z7DQsidXaXw/featured",
			icon: "youtube",
		},
		{
			link: "mailto:felipedevsec@gmail.com?subject=Felipe%20GD%20--%20Request%20To%20Contact",
			icon: "email",
		},
	];
	//function generates the typing animation for my name and my title
	useEffect(() => {
		const genName = setInterval(() => {
			if (climber === tagline.current.length) {
				//checks to make sure the description is equal to the number of the climber, looped by the interval in 75ms
				clearInterval(genName);
				displayIcon.current = "visible";
			} else {
				setClimber((val) => val + 1);
				console.log("going", climber);
				//increment and type out my name using the typing animation
			}
		}, 100);
		return () => {
			//honestly dont touch this, its really delicate and if we put the wrong code here we can create bugs on the site
			clearInterval(genName);
		};
	}, [climber, intro, tagline, descClimber]);

	//function handles the opacity and visibility of icons and button, triggers once the name and title are finished
	useEffect(() => {
		if (climber === tagline.current.length) {
			//only runs when name reaches its full length
			const scaleOpacity = setInterval(() => {
				//starts the interval, easy stuff
				if (opacitySet > 1 && buttonOpacity > 1) {
					//clears the interval once we check that opacity for the icons and buttons have reached 1
					clearInterval(scaleOpacity);
				} else {
					changeOpacity((val) => val + 0.0035);
					changeButtonOpacity((val) => val + 0.0015);
					console.log("test", opacitySet);
					//adding the opacity for the icon on top and button on bottom, this seems to be the most aesthetic result between the color difference
				}
			}, 5);
			return () => {
				clearInterval(scaleOpacity);
				//handles clearing the interval
			};
		}
	}, [opacitySet, tagline, buttonOpacity, climber]);

	return (
		<React.Fragment>
			<Helmet>
				<title>Felipe GD</title>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Helmet>
			<div clasName='row'>
				<div id='header' className='col s12 spacer layer1'>
					<h1 id='header-title' className='center-align'>
						{intro.current.substring(0, climber)}
					</h1>
					<h4
						id='desc'
						className='center-align'
						style={
							{
								/*opacity: opacitySet*/
							}
						}
					>
						{tagline.current.substring(0, climber)}
					</h4>
					<React.Fragment>
						<div className='container'>
							<div className='row'>
								<div id='socials' className='center-align'>
									{socialMedia.map((socials) => (
										<Socials
											getOpacity={opacitySet}
											getVisibility={displayIcon.current}
											link={socials.link}
											icon={socials.icon}
										/>
									))}
								</div>
							</div>
						</div>
					</React.Fragment>

					<p className='center-align'>
						<button
							id='header-button'
							className='btn center-align'
							style={{ opacity: buttonOpacity, visibility: displayIcon.current }}
						>
							Lets Explore!
						</button>
					</p>
				</div>
				<h1>test</h1>
			</div>
		</React.Fragment>
	);
}

export default Main;