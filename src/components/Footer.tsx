export default function Footer(){
    return(
        <footer className="bg-white shadow-inner py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-gray-600 text-sm md:text-base">
                    &copy; {new Date().getFullYear()} <span className="font-semibold text-indigo-700">CondoShop.</span>
                </p>
            </div>
        </footer>
    )
}