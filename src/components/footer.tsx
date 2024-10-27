const Footer = () => {
  return (
    <footer className="w-auto bg-white/25 mt-[5rem] md:mt-20 flex flex-col md:flex-row md:justify-between px-9 md:px-10 text-sm py-5 gap-3 border-t-2 border-gray-200 shadow-inner">
        <h1 className="text-wrap">© 2024 CASEiFY, Inc. All rights reserved.</h1>
        <div className="flex flex-cols gap-8 md:gap-5 tracking-tight">
          <h1>Terms</h1>
          <h1>Privacy Policy</h1>
          <h1>Cookie Policy</h1>
        </div>
      </footer>
  )
}

export default Footer