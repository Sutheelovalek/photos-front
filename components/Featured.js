/* eslint-disable @next/next/no-img-element */

export default function Featured() {
    return (
        <div className="px-[8%] bg-gray-600 grid grid-cols-2 gap-10">
            <div>
                <h1 className="text-2xl text-white pt-[10%]">The best stock photos.</h1>
                <p className="text-sm text-gray-200 py-4 pb-4">
                    Amet veniam ea ut cillum ex nostrud anim quis velit. Eiusmod ipsum consequat nostrud eiusmod irure id adipisicing consectetur commodo ipsum fugiat. Et voluptate nulla exercitation eu.
                    Ipsum nostrud nostrud enim minim ad labore sunt consequat ipsum mollit esse consectetur non. Enim et laborum sit ullamco amet. Labore esse cupidatat reprehenderit qui.
                </p>
                <button className="btn-primary mr-1">Read more</button>
                <button className="btn-secondary ml-1">Add to cart</button>
            </div>
            <div className="max-w-full py-[10%]">
                <img src="https://images.pexels.com/photos/6930919/pexels-photo-6930919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="hill image"/>
            </div>
        </div>
    );
}