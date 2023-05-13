
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from "react";
interface RouterNavigationEvent { }
export type RouterEventFunction = (e: RouterNavigationEvent) => void
interface RouterEvents {
  onStartQueue: RouterEventFunction[],
  onCompleteQueue: RouterEventFunction[],
  onStart: (callback: RouterEventFunction) => void,
  onComplete: (callback: RouterEventFunction) => void,
}
export const useNavigationEvent = () => {
  const [isRouterComplete, setIsRouterComplete] = useState(false)

  const router = useRouter()
  const routerEvents = useRef<RouterEvents>({
    onStartQueue: [],
    onCompleteQueue: [],
    onStart(cb: RouterEventFunction) {
      routerEvents.current.onStartQueue.push(cb)
      return () => {
        routerEvents.current.onStartQueue = routerEvents.current.onStartQueue.filter((c) => c !== cb)
      }
    },
    onComplete(cb: RouterEventFunction) {
      routerEvents.current.onCompleteQueue.push(cb)
      return () => {
        routerEvents.current.onCompleteQueue = routerEvents.current.onCompleteQueue.filter((c) => c !== cb)
      }
    },
  })

  const getCurrentUrl = () => {
    return {
      url: location.pathname + location.search
    }
  }

  const startRouterChange = () => {
    setIsRouterComplete(false)
    routerEvents.current.onStartQueue.forEach((cb) => cb(getCurrentUrl()))
  }

  const originalPush = router.push
  const originalReplace = router.replace

  useEffect(() => {
    router.push = (...args) => {
      startRouterChange()
      originalPush.apply(null, args)
    }

    router.replace = (...args) => {
      startRouterChange()
      originalReplace.apply(null, args)
    }

    return () => {
      router.push = originalPush
      router.replace = originalReplace
    }
  }, [])

  useEffect(() => {
    if (!isRouterComplete) return
    routerEvents.current.onCompleteQueue.forEach((cb) => cb(getCurrentUrl()))
  }, [isRouterComplete])

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname === location.pathname && searchParams?.toString() === new URLSearchParams(location.search).toString()) {
      setIsRouterComplete(true)
    }
  }, [pathname, searchParams])

  return {
    onStart: routerEvents.current.onStart,
    onComplete: routerEvents.current.onComplete,
  }
}