import { Button } from '@/components/ui/button'
import { useFontSize } from '@/lib/font-size'

// Fixed px sizes: the controls must not grow with the text they resize.
const buttonClass = 'size-[36px] text-[14px] font-semibold'

export default function FontSizeControls() {
  const { canDecrease, canIncrease, decrease, increase } = useFontSize()

  return (
    <div role="group" aria-label="Tamaño de letra" className="flex items-center">
      <Button
        variant="ghost"
        className={buttonClass}
        aria-label="Disminuir tamaño de letra"
        disabled={!canDecrease}
        onClick={decrease}
      >
        A-
      </Button>
      <Button
        variant="ghost"
        className={buttonClass}
        aria-label="Aumentar tamaño de letra"
        disabled={!canIncrease}
        onClick={increase}
      >
        A+
      </Button>
    </div>
  )
}
