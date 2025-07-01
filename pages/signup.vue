<template>
    <div class="min-h-screen bg-gray-50 lg:flex">
        <!-- Left Side - Content -->
        <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
            <!-- Back to Home -->
            <div class="mb-8">
                <NuxtLink to="/" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg> Back to Home
                </NuxtLink>
            </div>

            <div class="sm:max-w-md lg:max-w-lg">
                <!-- Header -->
                <div>
                    <h2 class="text-3xl font-bold text-gray-900 mb-2">
                        Start Your Career Journey Today
                    </h2>
                    <p class="text-gray-600 mb-8">
                        Join thousands of professionals who are using JobTracker to organize their job search and land
                        their dream positions faster.
                    </p>
                </div>

                <!-- Benefits List -->
                <div class="space-y-4 mb-8">
                    <div v-for="benefit in benefits" :key="benefit" class="flex items-center space-x-3">
                        <svg class="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                        <span class="text-gray-700">{{ benefit }}</span>
                    </div>
                </div>

                <!-- Testimonial -->
                <div class="bg-gray-50 p-6 rounded-lg">
                    <div class="flex items-center mb-4">
                        <div
                            class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                            SL
                        </div>
                        <div class="ml-3">
                            <div class="font-semibold text-gray-900">Ravi Vinayak</div>
                            <div class="text-sm text-gray-600">Actor at Marvel Studios</div>
                        </div>
                    </div>
                    <p class="text-gray-700 italic">
                         "Before JobTracker, I was applying to jobs like a headless chicken. Now I track everything and actually feel like an adult. Still waiting on NASA to call though."
                    </p>
                </div>
                 <div class="bg-gray-50 p-6 rounded-lg">
                    <div class="flex items-center mb-4">
                        <div
                            class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                            SL
                        </div>
                        <div class="ml-3">
                            <div class="font-semibold text-gray-900">Khuman Singh Sonwani </div>
                            <div class="text-sm text-gray-600">MotoGP Professional Rider</div>
                        </div>
                    </div>
                    <p class="text-gray-700 italic">
                          "I may race on the track, but JobTracker helped me win off it — landed a killer sponsorship deal at MMS hospital thanks to staying organized."
                    </p>
                </div>
            </div>
        </div>

        <!-- Right Side - Form -->
        <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
            <div class="sm:max-w-md lg:max-w-lg mx-auto w-full">
                <!-- Logo -->
                <div class="flex items-center space-x-2 mb-8">
                    <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fill-rule="evenodd"
                                d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45.855a2.5 2.5 0 10-3.9 0 .5.5 0 00.4.8h3.1a.5.5 0 00.4-.8z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <span class="text-xl font-bold text-gray-900">JobTracker</span>
                </div>

                <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-2">
                        Create your account
                    </h3>
                    <p class="text-gray-600 mb-8">
                        Get started with your free account today
                    <p class="text-red-400">
                        Oauth2 / magic link / emailotp is disabled for easy access
                    </p>
                    </p>
                </div>

                <!-- Form -->
                <form @submit.prevent="signup" class="space-y-6">
                    <!-- Name Fields -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="firstName" class="block text-sm font-medium text-gray-700">
                                First name
                            </label>
                            <input id="firstName" v-model="form.firstName" name="firstName" type="text"
                                placeholder="John" class="mt-1 input-field" />
                            <div class="text-red-500  absolute" v-if="(!isValidFirstName(form.firstName) && namecheck)">
                                Please enter a valid first name.
                            </div>
                        </div>
                        <div>
                            <label for="lastName" class="block text-sm font-medium text-gray-700">
                                Last name
                            </label>
                            <input id="lastName" v-model="form.lastName" name="lastName" type="text" placeholder="Doe"
                                class="mt-1 input-field" />
                            <div class="text-red-500  absolute" v-if="(!isValidLastName(form.lastName) && snamecheck)">
                                Please enter a valid last name.
                            </div>
                        </div>
                    </div>

                    <!-- Email -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input id="email" v-model="form.email" name="email" type="email" autocomplete="email"
                            placeholder="john.doe@example.com" class="mt-1 input-field" />
                        <div class="text-red-500  absolute" v-if="(!isValidEmail(form.email) && emailcheck)">
                            Please enter a valid email address.
                        </div>
                    </div>

                    <!-- Password -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div class="mt-1 relative">
                            <input id="password" v-model="form.password" name="password"
                                :type="showPassword ? 'text' : 'password'" placeholder="Create a strong password"
                                class="input-field pr-10" />
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <svg v-if="showPassword" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <svg v-else class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                </svg>
                            </button>
                        </div>
                        <p class="mt-1 text-sm text-gray-500">
                            Password should be at least 6 characters long
                        </p>
                        <div class="text-red-500  absolute" v-if="(!isValidPassword(form.password) && passwordcheck)">
                            Please enter a valid password.
                        </div>
                    </div>

                    <!-- Terms -->
                    <div class="flex items-start">
                        <input id="terms" v-model="form.acceptTerms" name="terms" type="checkbox"
                            class="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-1" />
                        <label for="terms" class="ml-2 block text-sm text-gray-900">
                            I agree to the
                            <a href="#" class="text-primary-600 hover:text-primary-500">Terms of Service</a>
                            and
                            <a href="#" class="text-primary-600 hover:text-primary-500">Privacy Policy</a>
                        </label>
                    </div>

                    <!-- Submit Button -->
                    <div class="w-full text-red-500 text-center" v-if="signUper">
                            {{signUper}}
                    </div>
                    <button @click="signup" class="btn-primary w-full" v-if="!signupSuccess">
                        Create account
                    </button>
                    <div class="font-medium text-blue-500 hover:text-blue-600 text-center text-2xl"
                        v-if="signupSuccess">
                        SignUp Successfully
                    </div>
                </form>

                <!-- Social Login -->
                <div class="mt-6">
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-300" />
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-white text-gray-500">OR CONTINUE WITH</span>
                        </div>
                    </div>

                    <div class="mt-6 grid grid-cols-2 gap-3">
                        <button class="btn-secondary flex items-center justify-center">
                            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </button>

                        <button class="btn-secondary flex items-center justify-center">
                            <svg class="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                                <path
                                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Facebook
                        </button>
                    </div>
                </div>

                <!-- Sign In Link -->
                <p class="mt-8 text-center text-sm text-gray-600">
                    Already have an account?
                    <NuxtLink to="/login" class="font-medium text-primary-600 hover:text-primary-500">
                        Sign in
                    </NuxtLink>

                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { supabase } = useSupabase();

useSeoMeta({
    title: 'Sign Up - JobTracker',
    description: 'Create your free JobTracker account and start organizing your job search today.',
})
definePageMeta({
    layout: false
})

const benefits = [
    'Track unlimited job applications',
    'Manage multiple resume versions',
    'Set and monitor career goals',
    'Get application insights and analytics'
]

const form = reactive({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    acceptTerms: false
})
const emailcheck = ref(false);
const namecheck = ref(false);
const passwordcheck = ref(false);
const snamecheck = ref(false);
const signupSuccess = ref(false);
const signUper=ref('');

const showPassword = ref(false)

function isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

function isValidFirstName(name: string): boolean {
    return name.trim().length > 0
}

function isValidLastName(name: string): boolean {
    return name.trim().length > 0
}

function isValidPassword(password: string): boolean {
    return password.trim().length >= 6
}

const user = useSupabaseUser();

watchEffect(() => {
    if (user.value) {
        navigateTo('/profile');
    }
});

async function signup() {
    let shouldret = false;

    if (!isValidPassword(form.password)) {
        passwordcheck.value = true;
        shouldret = true;
    }
    if (!isValidEmail(form.email)) {
        emailcheck.value = true;
        shouldret = true;
    }
    if (!isValidFirstName(form.firstName)) {
        namecheck.value = true;
        shouldret = true;
    }
    if (!isValidLastName(form.lastName)) {
        snamecheck.value = true;
        shouldret = true;
    }

    if (shouldret) return;

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password
    });

    if (signUpError) {
        signUper.value=(signUpError.message=="Database error saving new user"?'':signUpError.message);
        console.error('Signup error:', signUpError.message);
        return;
    }

    signupSuccess.value = true;

    const { error: profileError } = await supabase.from('user_profile').insert({
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        client_id: signUpData.user.id,
        email: form.email,
    });

    if (profileError) {
        console.error('User profile insert error:', profileError.message);
    }
}
watch(signupSuccess, (newValue) => {
    if (newValue) {
        setTimeout(() => {
            navigateTo('/profile')
        }, 2000);
    }
})

</script>