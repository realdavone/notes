import getRelativeTime from '../utils/relative-time'

export default function Timestamp({ timestamp }: { timestamp: string }) {
  return (
    <div className="timestamp">{getRelativeTime(timestamp)}</div>
  )
}
