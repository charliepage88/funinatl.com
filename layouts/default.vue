<template>
  <div>
    <nav class="font-sans flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-white shadow sm:items-baseline w-full">
      <div class="mb-2 sm:mb-0 flex flex-row
      ">
        <div class="bg-no-repeat bg-center w-1/2" style="background-image: url('/images/funinatl-bg.png');">
          <a href="/home" class="text-2xl no-underline text-grey-darkest hover:text-blue-dark font-sans font-bold">FunInATL</a>
        </div>
      </div>

      <div class="sm:mb-0 self-center">
        <!-- <div class="h-10" style="display: table-cell, vertical-align: middle;"> -->
        <a href="#" class="text-md no-underline text-black hover:text-blue-dark ml-2 px-1">Link1</a>
        <a href="#" class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1">Link2</a>
        <!-- <a href="/two" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">About Us</a> -->
        <a href="#" class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1">Link3</a>
        <!-- </div> -->

      </div>
    </nav>

    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'default'
}
</script>
