<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="pt-8 pb-4">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-center">
          <div class="flex items-center space-x-2">
            <div class="bg-blue-600 text-white px-2 py-1 rounded font-bold text-sm">
              JAT
            </div>
            <div>
              <div class="font-bold text-gray-800">JOB APPLICATION</div>
              <div class="text-xs text-gray-600">TRACKER</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Title Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
        <p class="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Supercharge your job search with our powerful tracking tools. One-time payment, lifetime access.
        </p>
        <div class="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm">
          <span class="text-orange-500 mr-2">⚡</span>
          One-time payment • No subscriptions • Lifetime access
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="pricing-grid max-w-7xl mx-auto mb-16">
        <div v-for="plan in plans" :key="plan.name"
          class="pricing-card bg-white rounded-xl shadow-lg p-8 relative flex flex-col" :class="plan.glowClass">
          <div class="text-center mb-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-2 rounded-2xl p-3" :class="plan.titleClass">
              {{ plan.name }}
            </h3>
            <div :class="['text-4xl font-bold', plan.priceColor]">
              ${{ plan.price }}
              <span class="text-lg font-normal text-gray-500">one-time</span>
            </div>
            <!-- <p class="text-gray-600 mt-2">{{ plan.description }}</p> -->
          </div>

          <ul class="space-y-3 mb-8">
            <li v-for="feature in plan.features" :key="feature" class="flex items-center text-gray-700">
              <span class="text-green-500 mr-3">✓</span>
              {{ feature }}
            </li>
          </ul>

          <div class="h-[100%]"></div>

          <button class="w-full py-3 px-6 rounded-lg font-semibold transition-colors" :class="plan.buttonClass"
            @click="checkout(plan.name)">
            {{ plan.buttonText }}
          </button>
        </div>
      </div>

      <!-- Why Choose One-Time Payment Section -->
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose One-Time Payment?</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- No Recurring Fees -->
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-green-600 text-2xl">✓</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">No Recurring Fees</h3>
            <p class="text-gray-600">
              Pay once and own it forever. No monthly subscriptions or hidden costs.
            </p>
          </div>

          <!-- Lifetime Updates -->
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-blue-600 text-2xl">⭐</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Lifetime Updates</h3>
            <p class="text-gray-600">
              Get all future features and improvements at no additional cost.
            </p>
          </div>

          <!-- Full Ownership -->
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-purple-600 text-2xl">👑</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Full Ownership</h3>
            <p class="text-gray-600">
              Your data stays with you. No risk of losing access due to payment issues.
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });

const plans = [
  {
    name: 'Free',
    price: 0,
    priceColor: 'text-gray-900',
    features: [
      'Track up to 5 applications',
      'Basic application status tracking',
      'Create 10 notes',
      'Access to integrated calender',
      'Store upto to 3 files',
      'Have 2 free resume',
      'Online preview',
      'Unlimited download'
    ],
    buttonText: 'Get Started Free',
    buttonClass: 'bg-blue-500 text-white hover:bg-blue-700',
    titleClass: 'bg-gray-100 text-gray-800',
    glowClass: 'glow-gray',
  },
  {
    name: 'Premium',
    price: 2,
    priceColor: 'text-blue-600',
    features: [
      'Track up to 10 job applications',
      'Store upto to 10 files',
      'Store upto to 5 resume',
      'Create up to 10 Notes',
      'Plus Basic feature'
    ],
    buttonText: 'Upgrade to Premium',
    buttonClass: 'bg-blue-500 text-white hover:bg-blue-700',
    titleClass: 'bg-violet-500 text-white',
    glowClass: 'glow-blue border-2 border-violet-300',
  },
  {
    name: 'King',
    price: 4,
    priceColor: 'text-yellow-600',
    features: [
      'Everything in Premium',
      'Unlimited Application',
      'Unlimited Files',
      'Unlimited Resume',
      'Unlimited Notes',
      'Plus Dedicated Support'
    ],
    buttonText: 'Go King Mode',
    buttonClass: 'bg-blue-500 text-white hover:bg-blue-700',
    titleClass: 'bg-amber-300 text-white',
    glowClass: 'glow-orange',
  }
];

const checkout = async (planname: string) => {
  const { data: { user }, error: userError } = await useSupabaseClient().auth.getUser();
  const userid = user?.id;
  const { data, error } = await useFetch('/api/checkout', {
    method: 'POST',
    body: { plan: planname ,
     client_id: userid,
    },
  });

  if (error.value) {
    console.log("Error: " + error.value.message);
  } else {
    const url = data.value?.url;
    if(!url)
    {
      alert("error with stripe server");
      return;
    }
    navigateTo(url,{
      external:true
    });
  }
};
</script>
<style scoped>
.glow-gray:hover {
  box-shadow: 0 0 40px rgba(107, 114, 128, 0.4),
    0 25px 50px -12px rgba(107, 114, 128, 0.2);
  background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
}

.glow-blue:hover {
  box-shadow: 0 0 40px rgba(59, 130, 246, 0.5),
    0 25px 50px -12px rgba(59, 130, 246, 0.3);
  background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);
}

.glow-orange:hover {
  box-shadow: 0 0 40px rgba(245, 158, 11, 0.5),
    0 25px 50px -12px rgba(245, 158, 11, 0.3);
  background: linear-gradient(135deg, #ffffff 0%, #fffbeb 100%);
}

.pricing-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .pricing-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

@media (min-width: 1024px) {
  .pricing-grid {
    gap: 2.5rem;
  }
}

.pricing-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.pricing-card:hover {
  transform: translateY(-12px) scale(1.02);
}

@media (max-width: 767px) {
  .pricing-card:hover {
    transform: translateY(-6px) scale(1.01);
  }
}
</style>
