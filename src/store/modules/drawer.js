export const namespaced = true

import keys from "@/helper/keys"

export const state = {
    primary_drawer: true,
    items: [
        {
            title: "Subscription Plan",
            url: {name: 'subscription_list'},
            src: require('@/assets/drawer-assets/subscription-active.svg'),
            // src_active: require('@/assets/images/customer-active.svg'),
            is_active_tab: false,
            access_by: [keys.SUPER_ADMIN, keys.ADMIN],
        },
        {
            title: "Students",
            url: {name: 'student_list'},
            src: require('@/assets/drawer-assets/student.svg'),
            // src_active: require('@/assets/images/customer-active.svg'),
            is_active_tab: false,
            access_by: [keys.SUPER_ADMIN, keys.ADMIN],
        },
        {
            title: "Tutors",
            url: {name: 'teacher_list'},
            src: require('@/assets/drawer-assets/payment.svg'),
            // src_active: require('@/assets/images/customer-active.svg'),
            is_active_tab: false,
            access_by: [keys.SUPER_ADMIN, keys.ADMIN],
        },
        {
            title: "Payments",
            url: {name: 'payment_list'},
             src: require('@/assets/drawer-assets/payment.svg'),
            // src_active: require('@/assets/images/customer-active.svg'),
            is_active_tab: false,
            access_by: [keys.SUPER_ADMIN, keys.ADMIN],
        },
        {
            title: "Payouts",
            url: {name: 'payout_list'},
             src: require('@/assets/drawer-assets/payout.svg'),
            // src_active: require('@/assets/images/customer-active.svg'),
            is_active_tab: false,
            access_by: [keys.SUPER_ADMIN, keys.ADMIN],
        },
        {
            title: "Leads",
            url: {name: 'payment_list'},
            src: require('@/assets/drawer-assets/leads.svg'),
            // src_active: require('@/assets/images/customer-active.svg'),
            is_active_tab: false,
            access_by: [keys.SUPER_ADMIN, keys.ADMIN],
        },
        {
            title: "Support",
            url: {name: 'support_ticket'},
            // src: require('@/assets/images/customer.svg'),
            // src_active: require('@/assets/images/customer-active.svg'),
            is_active_tab: false,
            access_by: [keys.SUPER_ADMIN, keys.ADMIN],
        },
        {
            title: "Sales",
            url: {name: 'student_list'},
            // src: require('@/assets/images/customer.svg'),
            // src_active: require('@/assets/images/customer-active.svg'),
            is_active_tab: false,
            access_by: [keys.SUPER_ADMIN, keys.ADMIN],
        },
        {
            title: "Revenue",
            url: {name: 'student_list'},
            // src: require('@/assets/images/customer.svg'),
            // src_active: require('@/assets/images/customer-active.svg'),
            is_active_tab: false,
            access_by: [keys.SUPER_ADMIN, keys.ADMIN],
        },
        {
            title: "Expences",
            url: {name: 'student_list'},
            // src: require('@/assets/images/customer.svg'),
            // src_active: require('@/assets/images/customer-active.svg'),
            is_active_tab: false,
            access_by: [keys.SUPER_ADMIN, keys.ADMIN],
        },

    ],
}

export const mutations = {
    SET_ACTIVE_TAB(state, index) {
        localStorage.setItem("active-tab", index);

        for (let i = 0; i < state.items.length; i++) {
            state.items[i].is_active_tab = false;
        }

        // //setting adtive tab

        if (index != -1) {
            let tab = state.items.filter(item => item.url.name == index);
            tab[0].is_active_tab = true;
        }
    },
    SET_PRIMARY_DRAWER(state, value) {
        state.primary_drawer = value;
    },

}

export const actions = {
    setActiveTab({commit}, index) {
        commit('SET_ACTIVE_TAB', index)
    },
    setPrimaryDrawer({commit}, value) {
        commit('SET_PRIMARY_DRAWER', value)
    },
}
export const getters = {
    getDrawerItems: state => {
        return state.items;
    },
    getManageTab: state => {
        return state.items[9];
    },
}