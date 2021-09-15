import { Box, Link, Heading, Text } from "@chakra-ui/react"

export type Event = {
  Title: string
  ID: string
  Description: string
  StartAt: Date
  EndAt: Date
  Latitude: number
  Longitude: number
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
        {event.Title}
      </Heading>
      <Box mb="1">{event.Description}</Box>
      {event.StartAt && event.EndAt && (
        <Text mb="1">
          {event.StartAt.toLocaleDateString()}~
          {event.EndAt.toLocaleDateString()}
        </Text>
      )}
      <Text textAlign="right" color="#ffa000">
        <Link href={`/shelf?event=${event.ID}`}>漫画を見る→</Link>
      </Text>
    </Box>
  )
}
