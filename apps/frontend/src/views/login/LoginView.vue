<template>
  <div class="flex items-center">
    <div class="card mx-auto w-full max-w-5xl shadow-xl">
      <div class="px-10 py-24">
        <h2 class="mb-2 text-center text-2xl font-semibold">Login</h2>
        <form>
          <div class="mb-4">
            <div class="form-control mt-4 w-full">
              <label class="label"><span class="undefined label-text text-base-content">Email Id</span></label
              ><input
                type="emailId"
                placeholder=""
                class="input input-bordered w-full"
                value=""
                data-siid="si_input_0"
                data-si-pw="0"
              />
            </div>
            <div class="form-control mt-4 w-full">
              <label class="label"><span class="undefined label-text text-base-content">Password</span></label
              ><input
                type="password"
                placeholder=""
                class="input input-bordered w-full"
                value=""
                data-siid="si_input_1"
                data-si-pw="1"
              />
            </div>
          </div>
          <div class="text-right text-primary">
            <a href="/forgot-password"
              ><span
                class="inline-block text-sm transition duration-200 hover:cursor-pointer hover:text-primary hover:underline"
                >Forgot Password?</span
              ></a
            >
          </div>
          <p class="mt-8 text-center text-error"></p>
          <button type="submit" class="btn btn-primary mt-2 w-full">Login</button>
          <div class="mt-4 text-center">
            Don't have an account yet?
            <a href="/register"
              ><span
                class="durati on-200 inline-block transition hover:cursor-pointer hover:text-primary hover:underline"
                >Register</span
              ></a
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
