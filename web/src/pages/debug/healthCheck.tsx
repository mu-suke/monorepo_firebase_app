import { Heading, Text } from '@chakra-ui/react'
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { firestore } from '@/utils/firebase'
import type { NextPage } from 'next'

const HealthCheck: NextPage = () => {
  const [isLoading, setLoading] = useState<boolean>(true)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const converter = {
      toFirestore(healthCheck: { healthy: boolean }) {
        return {
          healthy: healthCheck.healthy,
        }
      },
      fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
        const data = snapshot.data(options)
        return { ...data }
      },
    }

    const fetch = async () => {
      const collectionRef = collection(firestore, 'debug').withConverter(
        converter
      )
      const res = await getDocs(collectionRef)

      const data = res.docs.map(doc => doc.data())
      setData(data)
      setLoading(false)
    }
    void fetch()
  }, [])

  if (isLoading) {
    return <Text>loading ...</Text>
  }

  return (
    <>
      <Heading>HealthCheck</Heading>
      <Text>data: {JSON.stringify(data, null, 2)}</Text>
    </>
  )
}

export default HealthCheck
