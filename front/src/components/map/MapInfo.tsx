import { Box, Link, Heading, Text } from "@chakra-ui/react"

export type Event = {
  title: string
  id: string
  info: string
  startDate: Date
  endDate: Date
  location: { lat: number; lng: number }
}
type EventProps = {
  event: Event
}

export const MapInfo: React.FC<EventProps> = ({ event }) => {
  return (
    <Box maxW="sm">
      <Heading
        my="2"
        as="h4"
        size="sm"
        fontWeight="semibold"
        lineHeight="tight"
      >
        {event.title}
      </Heading>
      <Box mb="1">{event.info}</Box>
      <Text mb="1">
        {event.startDate.toLocaleDateString()}~
        {event.endDate.toLocaleDateString()}
      </Text>
      <Text textAlign="right" color="#ffa000">
        <Link href="/shelf">漫画を見る→</Link>
      </Text>
    </Box>
  )
}
