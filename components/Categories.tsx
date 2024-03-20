import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CategoriesCard } from './CategoriesCard'
import sanityClient, { urlFor } from '../sanity'
import { Strings } from '../types/types'

export const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    sanityClient.fetch(`*[_type == "category"]`)
    .then((data) => {
      setCategories(data)
    })
  }, [])

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 10,
      }}
    >
      {/* CategoriesCard */}
      {categories?.map((category: Strings) =>
        <CategoriesCard
          key={category._id}
          _id={category._id}
          title={category.name}
          imgUrl={urlFor(category.image).width(200).url()}
        />
      )}
    </ScrollView>
  )
}