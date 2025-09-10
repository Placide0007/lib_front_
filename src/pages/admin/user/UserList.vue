<template>
    <div class="w-full">
        <div class="overflow-x-auto">
            <table class="w-full table-auto border border-slate-300 text-center">
                <thead class="bg-blue-950  text-white">
                    <tr>
                        <th class="border border-slate-300 p-2">Order</th>
                        <th class="border border-slate-300 p-2">First Name</th>
                        <th class="border border-slate-300 p-2">Last Name</th>
                        <th class="border border-slate-300 p-2">Email Address</th>
                        <th class="border border-slate-300 p-2">About</th>
                        <th class="border border-slate-300 p-2">Role</th>
                        <th class="border border-slate-300 p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="hover:bg-gray-50">
                        <td class="border border-slate-300 p-2">1</td>
                        <td class="border border-slate-300 p-2">Rasolofomanana</td>
                        <td class="border border-slate-300 p-2">Rakoto</td>
                        <td class="border border-slate-300 p-2">koto@example.com</td>
                        <td class="border border-slate-300 p-2">
                            <a href="" class="underline" >view</a>
                        </td>
                        <td class="border border-slate-300 p-2">user</td>
                        <td class="border border-slate-300 p-2">
                            <div class="flex flex-wrap gap-2 justify-center">
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
