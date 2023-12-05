import React from 'react'

const HomeFeatures = () => {
  return (
    <div className="features container-fluid">
        <div className="feature-box col-lg-4 feature1">
            <i className="icons fa-solid fa-code"></i>
            <h3 className="feature-title">Code with your team</h3>
            <p>Open a Codeshare editor, write or copy code, then share it with friends and colleagues. Pair program and troubleshoot together.</p>
        </div>
  
        <div className="feature-box col-lg-4 feature2">
            <i className=" icons fa-solid fa-laptop"></i>
            <h3 className="feature-title">Interview Developers</h3>
            <p>Set coding tasks and observe in real-time when interviewing remotely or in person. Nobody likes writing code on a whiteboard.</p>
        </div>
  
        <div className="feature-box col-lg-4 feature3">
            <i className="fa-solid fa-person-chalkboard icons"></i>
            <h3 className="feature-title">Teach people to Code</h3>
            <p>Share your code with students and peers then educate them. Universities and colleges around the world use Codeshare every day.</p>
        </div>

</div>
  )
}

export default HomeFeatures