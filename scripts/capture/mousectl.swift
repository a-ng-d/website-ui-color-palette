import Foundation
import CoreGraphics

// mousectl move X Y [seconds]   — smooth move of the real cursor (global coords, y down)
// mousectl click                — left click at the current position
// mousectl pos                  — print the current position
// mousectl type "text"          — type text with key events (unicode)
let args = CommandLine.arguments
func here() -> CGPoint { CGEvent(source: nil)?.location ?? .zero }
func post(_ type: CGEventType, _ p: CGPoint) {
  CGEvent(mouseEventSource: nil, mouseType: type, mouseCursorPosition: p, mouseButton: .left)?.post(tap: .cghidEventTap)
}
guard args.count >= 2 else { print("usage"); exit(1) }
switch args[1] {
case "pos":
  let p = here(); print("\(Int(p.x)) \(Int(p.y))")
case "move":
  let to = CGPoint(x: Double(args[2])!, y: Double(args[3])!)
  let dur = args.count > 4 ? Double(args[4])! : 0.7
  let from = here()
  let steps = max(12, Int(dur * 60))
  for i in 1...steps {
    let t = Double(i) / Double(steps)
    let e = t < 0.5 ? 2 * t * t : 1 - pow(-2 * t + 2, 2) / 2   // ease in-out
    post(.mouseMoved, CGPoint(x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e))
    Thread.sleep(forTimeInterval: dur / Double(steps))
  }
  CGWarpMouseCursorPosition(to)          // land exactly on the target
  post(.mouseMoved, to)
case "click":
  let p = here()
  post(.leftMouseDown, p); Thread.sleep(forTimeInterval: 0.06); post(.leftMouseUp, p)
case "type":
  for ch in args[2] {
    let s = String(ch)
    let utf16 = Array(s.utf16)
    let down = CGEvent(keyboardEventSource: nil, virtualKey: 0, keyDown: true)
    down?.keyboardSetUnicodeString(stringLength: utf16.count, unicodeString: utf16)
    down?.post(tap: .cghidEventTap)
    let up = CGEvent(keyboardEventSource: nil, virtualKey: 0, keyDown: false)
    up?.keyboardSetUnicodeString(stringLength: utf16.count, unicodeString: utf16)
    up?.post(tap: .cghidEventTap)
    Thread.sleep(forTimeInterval: 0.09)
  }
default: print("unknown"); exit(1)
}
