<template>
    <div class="w-full">
        <div class="mb-1 flex justify-between items-center" >
            <p class="table-caption text-sm text-slate-500">Categories list</p>
            <router-link class="px-3 py-1  border-slate-700 border  hover:text-white hover:bg-slate-800" to="create-category">New Category</router-link>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full table-auto border border-slate-300 text-center">
                <thead class="bg-blue-950  text-white">
                    <tr>
                        <th class="border border-slate-300 p-1">Order</th>
                        <th class="border border-slate-300 p-1">Category name</th>
                        <th class="border border-slate-300 p-1">Total Books</th>
                        <th class="border border-slate-300 p-1">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="hover:bg-gray-50">
                        <td class="border border-slate-300 p-1">1</td>
                        <td class="border border-slate-300 p-1">jungle book</td>
                        <td class="border border-slate-300 p-1">543</td>
                        <td class="border border-slate-300 p-1">
                            <div class="flex flex-wrap gap-1 justify-center">
                                <button class="bg-green-900 py-2 px-4 rounded-sm text-sm cursor-pointer text-white hover:bg-green-800">Edit</button>
                                <button class="bg-red-800 hover:bg-red-700 py-2 px-4 rounded-sm text-sm cursor-pointer text-white">Delete</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
