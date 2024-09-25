import { Link } from 'react-router-dom'

const MyBio = () => {
  return (
    <div>

<section className="text-gray-600 body-font h-screen flex bg-gray-900 bg-svg-constellation-gray-100 relative">
  <div className="container mx-auto flex px-5 py-12 items-center justify-center flex-col">
    <div className="lg:w-2/3 w-full animate-fade-in-down">
      <h1 className="md:text-6xl text-3xl mb-2 font-bold text-white tracking-tight leading-tight">
        Hello, I'm Dhaval.
      </h1>
      <h1 className="md:text-6xl text-3xl mb-4 font-bold text-white tracking-tight leading-tight">
        Thank you for <span className="border-b-4 border-green-400 -mb-20"></span>the opportunity.
      </h1>
      <p className="mt-8 mb-16 md:leading-relaxed leading-normal text-white tracking-tight text-xl">
        I am a ReactJs Web developer. I'm here to provide the task and answer your queries to the best of my abilities.</p>
      <a className="uppercase rounded-sm bg-red-400 font-bold text-white px-8 py-4 mx-auto mr-4 hidden md:inline">Contact Me</a>
      <Link to={
        "/dashboard"
      } className="uppercase rounded-sm bg-green-400 font-bold text-white px-8 py-4 mx-auto hidden md:inline"
        >Task</Link>
    </div>
  </div>
  <a href="#about-me" className="absolute block mx-auto text-xl md:mt-96 bottom-0 left-1/2 -ml-10 mt-80">
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M21.1716 29.1716C22.7337 27.6095 25.2663 27.6095 26.8284 29.1716L40 42.3431L53.1716 29.1716C54.7337 27.6095 57.2663 27.6095 58.8284 29.1716C60.3905 30.7337 60.3905 33.2663 58.8284 34.8284L42.8284 50.8284C41.2663 52.3905 38.7337 52.3905 37.1716 50.8284L21.1716 34.8284C19.6095 33.2663 19.6095 30.7337 21.1716 29.1716Z"
        fill="#FFFFFF"></path>
    </svg>
  </a>
</section>

    </div>
  )
}

export default MyBio