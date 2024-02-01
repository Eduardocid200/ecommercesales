'use client'
const SearchBar = () => {
    return ( <div className="flex items-center">
        <input 
        autoComplete="off"
        type="text"
        placeholder="Explora ImportSales!"
         className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:bourder-
        0.5px] focus:forder-slate-500 w-80 text-center"/>
        <button className="bg-slate-700 hover:opacity-80 text-white p-2 rounded-r-md">Search</button>
        </div> );
}
 
export default SearchBar;