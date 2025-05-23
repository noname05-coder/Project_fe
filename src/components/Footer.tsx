

export const Footer = ()=>{
    return(
        <div>
        <footer className="bg-slate-100 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-navy-600"></div>
              <span className="font-display font-semibold text-xl">InterviewAI</span>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center text-sm">
              <a href="#" className="text-slate-600 hover:text-navy-600">About</a>
              <a href="#" className="text-slate-600 hover:text-navy-600">Privacy</a>
              <a href="#" className="text-slate-600 hover:text-navy-600">Terms</a>
              <a href="#" className="text-slate-600 hover:text-navy-600">Contact</a>
              <p className="text-slate-500">© 2025 InterviewAI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    )
}