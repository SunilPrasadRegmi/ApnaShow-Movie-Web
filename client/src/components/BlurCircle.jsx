const BlurCircle = ({top = "auto", left = "auto", right = "auto", bottom = "auto"}) => {
  return (
    <div className="absolute -z-50 w-58 h-58 bg-primary/30 aspect-square rounded-full blur-3xl" style={{ top: top, left: left, right: right, bottom: bottom }}>

    </div>
  )
}

export default BlurCircle