import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"

interface VideoDialogProps {
  videoId: string | null
  title: string
  onClose: () => void
}

export function VideoDialog({ videoId, title, onClose }: VideoDialogProps) {
  return (
    <Dialog open={videoId !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[94vw] max-w-[94vw] sm:max-w-[94vw] p-2">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {videoId && (
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
