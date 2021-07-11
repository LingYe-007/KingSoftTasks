/**
 * 清屏
 */
export default function() {
  process.stdout.write('\x1Bc')
}