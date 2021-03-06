//
//  condition_variable_any.h
//  ePub3
//
//  Created by Jim Dovey on 11/13/2013.
//  Copyright (c) 2013 The Readium Foundation and contributors. All rights reserved.
//

#ifndef ePub3_condition_variable_any_h
#define ePub3_condition_variable_any_h

#include <ePub3/_config.h>
#include <mutex>
#include <condition_variable>

EPUB3_BEGIN_NAMESPACE

template <typename _Mut>
struct __lock_on_exit
{
    _Mut*   __m_;
    
    __lock_on_exit()
        : __m_(nullptr)
        {}
    
    void activate(_Mut& __m)
        {
            __m.unlock();
            __m_ = &__m;
        }
    
    ~__lock_on_exit()
        {
            if (__m_ != nullptr)
                __m_->lock();
        }
};

class condition_variable_any
{
    std::mutex              __internal_mutex_;
    std::condition_variable __cond_;
    
    condition_variable_any(const condition_variable_any&) _DELETED_;
    condition_variable_any& operator=(const condition_variable_any&) _DELETED_;
    
public:
    FORCE_INLINE
    condition_variable_any()
        : __internal_mutex_(), __cond_()
        {}
    
    FORCE_INLINE
    ~condition_variable_any()
        {}
    
    template <typename _Lock>
    FORCE_INLINE
    void wait(_Lock& __l)
        {
            __lock_on_exit<_Lock> __guard;
            std::unique_lock<std::mutex> __lk(__internal_mutex_);
            
            __guard.activate(__l);
            __cond_.wait(__lk);
        }
    
    template <typename _Lock, typename _Predicate>
    FORCE_INLINE
    void wait(_Lock& __l, _Predicate __pred)
        {
            while (!__pred())
                wait(__l);
        }
    
    template <class _Lock, class _Clock, class _Duration>
    FORCE_INLINE
    std::cv_status wait_until(_Lock& __l, const std::chrono::time_point<_Clock, _Duration>& __t)
        {
            __lock_on_exit<_Lock> __guard;
            std::unique_lock<std::mutex> __lk(__internal_mutex_);
            __guard.activate(__l);
            return __cond_.wait(__lk, __t);
        }
    
    template <class _Lock, class _Clock, class _Duration, class _Predicate>
    FORCE_INLINE
    bool wait_until(_Lock& __l, const std::chrono::time_point<_Clock, _Duration>& __t, _Predicate __pred)
        {
            while (!__pred())
            {
                if (wait_until(__l, __t) == std::cv_status::timeout)
                    return __pred();
            }
            return true;
        }
    
    template <class _Lock, class _Rep, class _Period>
    FORCE_INLINE
    std::cv_status wait_for(_Lock& __l, const std::chrono::duration<_Rep, _Period>& __d)
        {
            __lock_on_exit<_Lock> __guard;
            std::unique_lock<std::mutex> __lk(__internal_mutex_);
            __guard.activate(__l);
            return __cond_.wait_for(__lk, __d);
        }
    
    template <class _Lock, class _Rep, class _Period, class _Predicate>
    FORCE_INLINE
    bool wait_for(_Lock& __l, const std::chrono::duration<_Rep, _Period>& __d, _Predicate __pred)
        {
            return wait_until(__l, std::chrono::steady_clock::now() + __d, std::move(__pred));
        }
    
    FORCE_INLINE
    void notify_one() _NOEXCEPT
        {
            __cond_.notify_one();
        }
    
    FORCE_INLINE
    void notify_all() _NOEXCEPT
        {
            __cond_.notify_all();
        }
    
};

EPUB3_END_NAMESPACE

#endif
