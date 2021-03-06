import firebase from "firebase/compat/app";
import "firebase/compat/database";
/* eslint-disable */

export default {
  actions: {
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit })
        return { title, limit, id: category.key }
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const categories = await (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || []
        return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async updateCategory({ commit, dispatch }, { id, title, limit }) {
      try {
        const uid = await dispatch('getUid')
        await await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  }
}