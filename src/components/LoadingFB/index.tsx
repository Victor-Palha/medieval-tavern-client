type LoadingFBProps = {
    type: "list" | "carousel";
}

export function LoadingFB({type}: LoadingFBProps) {
    return (
        <>
        {type === "list" && (
            <div className="flex max-h-[300px] overflow-hidden w-full gap-3 cursor-progress">
                <div>
                    <div className="h-[150px] w-[180px] rounded-lg animated-background"></div>
                </div>
                <div className="flex flex-col overflow-hidden max-h-[200px] gap-2 group">
                    <p className="animated-background w-[200px] h-[25px]"></p>
                    <p className="animated-background w-[150px] h-[25px]"></p>
                    <p className="animated-background w-[100px] h-[10px]"></p>
                    <p className="animated-background w-[300px] md:w-[500px] lg:w-[700px] h-full"></p>
                </div>
            </div>
        )}
        {type === "carousel" && (
            <div 
                className="max-w-[300px] min-w-[300px]
                    max-h-[450px] min-h-[500px]
                    bg-white rounded-xl
                    overflow-hidden shadow-lg
                    opacity-90
                    flex flex-col
                    justify-between
            ">
                <>
                    <div 
                        className="w-full h-[200px] object-cover rounded-t-xl pointer-events-none animated-background"
                    />
                    <div className="p-[12px] flex flex-col items-start h-full cursor-pointer">
                        <div className="flex flex-col gap-2 mx-auto">
                            <p className="animated-background w-[280px] h-[20px]"></p>
                            <p className="animated-background w-[280px] h-[10px]"></p>
                            <p className="animated-background w-[280px] h-[10px]"></p>
                            <p className="animated-background w-[280px] h-[10px]"></p>
                            <p className="animated-background w-[280px] h-[10px]"></p>
                            <p className="animated-background w-[280px] h-[10px]"></p>
                        </div>
                    </div>
                </>
                <div className="p-[12px] items-center gap-2 flex border-t-[2px] border-secondary">
                    <div className="w-12 h-12 rounded-full object-cover border-[2px] border-font shadow-md pointer-events-none"/>
                    <p className="animated-background w-[200px] h-[20px]"></p>
                </div>
            </div>
        )}
        </>

    )
}