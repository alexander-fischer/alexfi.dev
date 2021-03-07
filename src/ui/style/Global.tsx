export const globalStyle = () => {
    return <style jsx global>{`


:root {
    --backgroundColor: #FFFFFF;
    --fontColor: #1b1b1b;

    --lightGray: #eeeeee;
    --mediumGray: #bdbdbd;
    --darkGray: #424242;

    --accent: #01796f;
}

html, body {
    font-family: 'Open Sans', sans-serif;
    background-color: var(--backgroundColor);
    color: var(--fontColor);
    -webkit-font-smoothing: auto;
    -moz-osx-font-smoothing: auto;
}

h1 {
    font-size: 2rem !important;
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
}

h2 {
    font-size: 1.66rem !important;
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
}

h3 {
    font-size: 1.33rem !important;
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
}

a {
    cursor: pointer;
    color: var(--accent);
}

button {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-radius: 5px;
}

img {
    max-height: 100%;
    max-width: 100%;
}

.mono {
    font-family: 'Roboto Mono', monospace;
}

.h-100 {
    height: 100%;
}

.w-100 {
    width: 100%;
}

.pointer {
    cursor: pointer;
}

.no-my {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
}

.bg-standard {
    background-color: var(--backgroundColor);
}

.text-standard {
    color: var(--fontColor);
}

.text-mediumgray {
    color: var(--mediumGray);
}

.text-darkgray {
    color: var(--darkGray);
}

.bg-accent {
    background-color: var(--accent);
}

.text-accent {
    color: var(--accent);
}

    `}</style>
}