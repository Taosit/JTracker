<div align="center">
<h1> Job Application Tracker</h1>

> This project is bundled using [Chrome Extension Boilerplate React Vite](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite)

</div>

## Intro

This chrome extension helps to keep track of online job applications.

To create an application, you can simply select the company name on any site and right click to find the extension menu, which will activate a draggable window injected into the site you are viewing. You can also add questions and answers from the extension menu after an application is started. Your applications can be viewed and managed by clicking on the extension icon to activate the popup. You can add some job websites on the option page by right clicking on the extension icon, so that the injected window will be shown by default on these sites.

## Features

### Any page in the Chrome browser (except for a few reserved pages)

- Start an application by selecting a company name with mouse cursor and clicking on "Start Application" on the content menu to fill in the company name and the link on the injected window.
- Add a question on the injected window by selecting a question with mouse cursor and clicking "Add Question" on the content menu.
- Add an answet on the injected window by selecting an answer with mouse cursor and clicking "Add Answer" on the content menu.
- Edit any fields on the injected window and add some notes.
- Complete the application by clicking the Done button.
- Drag the blue bar at the top of the window to drag it anywhere within the page.

### Popup Page

- Toggle show window to show or hide the injected window on the current site.
- See an overview and a list of all applications.
- Search an application by company name or question keywords.
- Sort applications by application dates or stages.
- Advance the stage of an application or set it to rejected or accepted.
- View the details of an application, add and edit questions and notes for the initial application stage, and different interview stages if applicable.
- Add and edit interview dates if applicable

### Option Page

- Add and edit website urls where the injected window is shown by default.
- Toggle if applications are automatically set to rejected after 30 days in the initial applied stage.
