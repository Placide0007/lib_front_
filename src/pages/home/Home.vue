<template>
    <!-- Hero Section -->
    <section id="hero" class="grid sm:grid-cols-1 md:grid-cols-2 bg-gray-50 px-5 py-10 md:py-5">
        <!-- Left Column -->
        <div class="flex justify-center items-center flex-col gap-6 md:gap-8 text-center px-4">
            <p class="text-5xl  md:text-8xl  font-extrabold leading-tight text-slate-800">
                Manage your library Effortlessly
            </p>
            <p class="text-base sm:text-xm text-slate-500 max-w-xl ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus voluptatem quaerat quidem,
                delectus amet tenetur saepe.
            </p>
        </div>

        <!-- Right Column -->
        <div class="flex justify-center items-center px-4">
            <img src="../../assets/biblio.svg" alt="Library Illustration"
                class="w-full max-w-md md:max-w-lg lg:max-w-xl">
        </div>
    </section>

    <!-- Jumbotron Section -->
    <section id="jumbotron" class="p-4">
        <div class="p-10 gap-2 flex flex-col">
            <p class="text-center font-bold text-2xl">Lorem ipsum dolor sit amet.</p>
            <p class="text-center text-sm">Lorem ipsum dolor sit amet.</p>
        </div>

        <!-- categories container  -->
        <div class="categories-list flex gap-5  py-4 px-2">
            <button class="bg-gray-400 text-white rounded-sm p-2 text-xs cursor-pointer" >Romantique</button>
            <button class="bg-gray-400 text-white rounded-sm p-2 text-xs cursor-pointer" >Romantique</button>
        </div>

        <!-- card container -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-5 p-2">
            <div class="card">
                <div> <img src="../../assets/3.jpg" alt="book image"
                        class="cursor-pointer h-auto grayscale-0 hover:grayscale-75 hover:-translate-y-2 duration-300 w-full">
                    <p class="text-center text-xs mt-2">Lorem ipsum dolor.</p>
                </div>
            </div>
            <div class="card">
                <div> <img src="../../assets/5.jpg" alt="book image"
                        class="cursor-pointer h-auto grayscale-0 hover:grayscale-75 hover:-translate-y-2 duration-300 w-full">
                    <p class="text-center text-xs mt-2">Lorem ipsum dolor.</p>
                </div>
            </div>
            <div class="card">
                <div> <img src="../../assets/5.jpg" alt="book image"
                        class="cursor-pointer h-auto grayscale-0 hover:grayscale-75 hover:-translate-y-2 duration-300 w-full">
                    <p class="text-center text-xs mt-2">Lorem ipsum dolor.</p>
                </div>
            </div>
            <div class="card">
                <div> <img src="../../assets/8.jpg" alt="book image"
                        class="cursor-pointer h-auto grayscale-0 hover:grayscale-75 hover:-translate-y-2 duration-300 w-full">
                    <p class="text-center text-xs mt-2">Lorem ipsum dolor.</p>
                </div>
            </div>
            <div class="card">
                <div> <img src="../../assets/3.jpg" alt="book image"
                        class="cursor-pointer h-auto grayscale-0 hover:grayscale-75 hover:-translate-y-2 duration-300 w-full">
                    <p class="text-center text-xs mt-2">Lorem ipsum dolor.</p>
                </div>
            </div>
        </div>
    </section>
</template>
