# Fireball ☄️

## 🌍 Overview

This app was developed as a part of the 6-week [Chingu](https://www.chingu.io/) Voyage 45 in August and September 2023. The app uses data from [NASA's Open Data Portal Meteorite Landings dataset](https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh). According to the NASA Open Data Portal, "This comprehensive data set from The Meteoritical Society contains information on all of the known meteorite landings."

The goals for this project included:

- To create a purely frontend application using the NASA data.
- To use any language, tool, or library to plan, design, and build the app.
- To build the app without the use of AI-base solution generators like GitHub CoPilot.
- To build a minimally viable product (MVP) that includes a landing page with:
  - A scrollable detail data display showing the meteorite strike history
  - Search fields allowing users to customize a detail data display
  - A summary metrics component showing the data graphically

In addition to the goals related to the application functionality, our team also had goals related to building experience working with an international, remote team of developers and product owner:

- To try using new tools to build the application.
- To manage workflow with an international, remote team of developers and product owner.

## 🧑‍🤝‍🧑 Voyage Team

-
-
-
-
- [Crystal Rose-Wainstock](https://github.com/crwainstock) 👋

## ✨ Features

- Detailed display of meteorite data with search filters
- Interactive map of meteorite data with search filters
- Interactive graphical summaries of meteorite data

## 🛠️ Technologies & Dependencies

To plan and manage our workflow, we used:

- Figma
- Jira
- Discord channel

To build the application, we used:

- React
- Vite
- [d3js](https://d3js.org/what-is-d3)
- [Maps Geocode](https://geocode.maps.co/)
- [Chart.js](https://www.chartjs.org/)
- [TanStack Table](https://tanstack.com/table/v8/)
- [Emotion](https://emotion.sh/docs/introduction)
- [Material UI](https://mui.com/material-ui/getting-started/)

## 👩‍💻 Running the App

1. Clone this repo.

```
git clone https://github.com/chingu-voyages/v45-tier2-team-19.git
```

2. Navigate to the project directory.

```
cd v45-tier2-team-19
```

3. Then navigate to the app within the project.

```
cd fireball
```

4. Install the dependencies.

```
npm install
```

## 🤩 Future Directions

This project was built from scratch over 6 weeks, and with such a time constraint, we weren't able to do everything we could dream of doing with the app. The following is a list of things that we would work on if we continued with this build after the Voyage timeline:

- The summary component could be more interactive. Currently, the graphs give more information about the data points when you hover or click on them. But, the only graph that is really interactive is the bar graph that filters the data by meterorite mass with a slider. It would be nice to have more opportunities for interaction in this section, including possibly a filter or search feature.
- To appeal to a general user base, as opposed to researchers or scientists, it would be nice to include a component that generates interesting facts about meteorites.
- Along the lines of the previous point, it could be useful to include something like a news aggregate component that allows users to see current news media related to meteorites and related topics.

## 👀 App Demo
