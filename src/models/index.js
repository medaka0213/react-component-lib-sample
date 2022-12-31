import { Launch } from "./launch";
import { Event } from "./event";
import { Config } from "./config";
import { Slide } from "./slide";
import { MeetUp } from "./meetup";
import { Countdown } from "./countdown";
import { Image } from "./image";
import { Wiki } from "./wiki";
import { Task } from "./task";
import { SlideText } from "./slideText";
import { Rocket } from "./rocket";
import { RocketSeries } from "./rocket_series";

const Models = {
    launch : Launch,
    event: Event,
    slide: Slide,
    meetup: MeetUp,
    config: Config,
    countdown: Countdown,
    image: Image,
    wiki: Wiki,
    task: Task,
    "slide-text": SlideText,
    rocket: Rocket,
    rocketSeries: RocketSeries,
}

export function GetModel(type) {
    if (type in Models) {
        return Models[type]
    } else {
        return Object
    }
}

export default Models